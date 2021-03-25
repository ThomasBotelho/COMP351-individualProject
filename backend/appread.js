// APP READ
let http = require('http');
const mysql = require("mysql");
let url = require('url');

const db = mysql.createConnection({
    host: "localhost",
    user: "thomasbo_individualProject",
    password: "individualProject123",
    database: "thomasbo_individualProject"
});

var server = http.createServer(function(req, res) {
    let q = url.parse(req.url, true);
    res.writeHead(200, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    db.connect(function (err) {
        if (err) {
            throw err;
        }
        
        let sql = "SELECT * FROM quoteList ORDER BY quoteID asc";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.end(JSON.stringify(result));
        })
    })

});
server.listen();
