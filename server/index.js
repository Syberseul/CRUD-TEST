const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root", // mysql userName
  password: "Soul_403058721", // mysql login password
  database: "crud-database", // mysql schema name
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sql = "select * from movie_reviews";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res, next) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sql = "insert into movie_reviews (movieName, movieReview) values (?,?)";
  db.query(sql, [movieName, movieReview], (err, result) => {
    if (err) console.error(err);
  });
});

app.delete("/api/delete/:movieID", (req, res, next) => {
  const movieID = req.params.movieID;
  const sql = "delete from movie_reviews where id = ?";
  db.query(sql, movieID, (err, result) => {
    if (err) console.error(err);
  });
});

app.put("/api/update/:movieID", (req, res, next) => {
  const newReview = req.body.newReview;
  const movieID = req.params.movieID;
  const sql = "update movie_reviews set movieReview = ? where id = ?";
  db.query(sql, [newReview, movieID], (err, result) => {
    if (err) console.error(err);
  });
});

app.listen(3001, () => {
  console.log("listening on port: 3001");
});
