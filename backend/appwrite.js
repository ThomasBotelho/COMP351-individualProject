// APP WRITE

const http = require('http');
const mysql = require("mysql");

const db = mysql.createPool({
    connectionLimit: 10,
    multipleStatements: true,
    host: "localhost",
    user: "thomasbo_individualProject",
    password: "individualProject123",
    database: "thomasbo_individualProject"
});

const server = http.createServer(function(request, response) {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      console.log('Body: ' + body);
      response.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
      response.end(body);
      
      let outputThing = JSON.parse(body);
      
        db.getConnection(function (err, connection) {
            if (err) {
                throw err;
            }
            
            let deleteSQL = "DELETE FROM quoteList;";
            connection.query(deleteSQL, function (err, result) {
                    if (err) throw err;
                    response.end(result);
                });
            
            for (let i=0; i < outputThing.length; i++){
                connection.query("INSERT INTO quoteList(quoteID, quoteText) VALUES (?,?)", [outputThing[i].quoteID, outputThing[i].quoteText], function (err, result) {
                    if (err) throw err;
                    response.end(result);
                });
            }
            connection.release();
        });
    });
});
server.listen();
