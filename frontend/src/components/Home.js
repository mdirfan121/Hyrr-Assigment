import React, { useState, useEffect, useCallback } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    if (currentPage > totalPages && totalPages !== 0) return;
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/posts?page=${currentPage}&limit=10`);
      if (!response.ok) {
        throw new Error('Data could not be fetched');
      }
      const data = await response.json();
      setPosts(prevPosts => [...prevPosts, ...data.posts]);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
      setCurrentPage(currentPage => currentPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div className="container">
      <h1 className='mt-3'>Posts</h1>
      <div className="row">
        {posts.map(post => (
          <div className="col-md-4" key={post.id}>
            <div className="card mt-3 mb-3">
              <img src={post.url} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{post.heading}</h5>
                <p className="card-text">{post.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLoading && <p>Loading more posts...</p>}
    </div>
  );
};

export default Posts;
