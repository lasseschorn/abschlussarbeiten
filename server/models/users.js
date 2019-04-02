const bcrypt = require('bcrypt');
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

        }



    };
}
