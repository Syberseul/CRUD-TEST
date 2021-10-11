const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root", // mysql userName
  password: "Soul_403058721", // mysql login password
  database: "crud-database", // mysql schema name
});

con.connect();

function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
  return promise;
}

module.exports = {
  exec,
};
