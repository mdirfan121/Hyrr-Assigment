const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Irfan@2024",
    database: "assignment"
})

//api for inserting new user data
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`username`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if(err){
            console.error(err);
            return res.json("Error");
        }
        return res.json(data);
    });
});

//api for login 
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email,req.body.password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("Success");
        }
        else{
            return res.json("Fail");
        }
    });
});

//api for getitng the post data from post table
app.get('/posts', (req, res) => {
    let { page, limit } = req.query;
    page = parseInt(page, 12) || 1;
    limit = parseInt(limit, 12) || 12; // Default to 10 posts per page
    const offset = (page - 1) * limit;
  
    db.query('SELECT COUNT(*) AS count FROM post', (err, countResults) => {
      if (err) {
        res.status(500).send('Error fetching count');
        return;
      }
      const totalCount = countResults[0].count;
  
      const query = 'SELECT * FROM post LIMIT ?, ?';
      db.query(query, [offset, limit], (err, results) => {
        if (err) {
          res.status(500).send('Error fetching posts');
          return;
        }
        res.json({
          posts: results,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page
        });
      });
    });
  });
  

app.listen(3000, ()=>{
    console.log("listening");
})
