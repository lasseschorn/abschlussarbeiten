exports.method =
function(connection, callback) {
    return {
        checkuser: (req) => {
    //Hier die richtigen variablennamen einsetzen
        	var username = req.query['zID'];
        	var password = req.query['pwd'];
        	var sql  = `SELECT *
                        FROM zugangsdaten
                        WHERE zugangsID = ? and passwort = ?`;
            connection.query(sql, [username,password] , function(error,results){
              if (error){
                return callback(new Error("Falsche Zugangsdaten."),null)
              } else {
                if(results){
                return callback(null,username);
              } else {
                return callback(new Error("Etwas ist schief gegangen."),null);
              }
            }
            });
        },

        add: (req) => {

        }



    };
}
