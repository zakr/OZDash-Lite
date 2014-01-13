var mysql      = require('mysql');
var db_config = {
  //need to load the values from a config file
  host     : '',
  user     : '',
  password : '',
  database: ''
}

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();


function getSomeData(cb){
  var response = null;
  var queryStatement = '';

  connection.query(queryStatement, function(err, rows, fields) {
  if (err) throw err;
  response = rows;

  try
  {
     var json = JSON.stringify(response);
  }
  catch(e)
  {
     console.log('invalid thing to stringify');
  }

  cb(json);  
});

};

exports.getSomeData = getSomeData;