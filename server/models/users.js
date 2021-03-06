//const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.method =
function(connection, callback) {
    return {
        checkuser: (req) => {
    //Hier die richtigen variablennamen einsetzen
        	var username = req.query['zID'];
        	var password = req.query['pwd'];

          var hashedPassword ;

          const myPlaintextPassword = password;
          //bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
          //      return ;

        //  });
          //console.log(hashedPassword);

          //var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

          //console.log(hashedPassword);

          var sql  = `SELECT *
                        FROM zugangsdaten
                        WHERE zugangsID = ? and passwort like "` + password + `"`;

            connection.query(sql,username , function(error,results){
              if (error){
                return callback(new Error("Etwas ist schief gegangen."),null);
              } else {
                  if(results.length == 0 ){
                    return callback(new Error("Falsche Zugangsdaten."),null)
                  } else {
                    return callback(null,username);
                  }
            }
          });
        },

        add: (req) => {
          const ins = {
              zugangsID: req.query['zID'],
              person_personenID: req.query['pID'],
              passwort: req.query['pwd'],
              userType: req.query['uType']
          }
          var sql = `INSERT INTO Zugangsdaten SET ? `
                connection.query(sql,ins,function(error,results){
                  if (error){
                    return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
                  } else{
                    return callback(null,JSON.stringify(results));
                  }
                });

        },
        getUserDetails: (req) => {
          var username = req.query['zID'];
        	var password = req.query['pwd'];

          var sql  = `SELECT userType
                        FROM zugangsdaten
                        WHERE zugangsID = ? and passwort like "` + password + `"`;

            connection.query(sql,username , function(error,results,fields){
              if (error){
                return callback(new Error("Etwas ist schief gegangen."),null);
              } else {
                  if(results.length == 0 ){
                    return callback(new Error("Falsche Zugangsdaten."),null)
                  } else {
                    var temp = JSON.stringify(results[0]).toString();
                    var userType = temp.slice((temp.indexOf(":") + 2),temp.lastIndexOf('"'));
                    return callback(null,userType,username);
                  }
            }
          });
        }



    };
}
