exports.method =
function(connection, callback) {
    return {
        checkuser: (req) => {
        	
    //Hier die richtigen variablennamen einsetzen        	
        	var username = req.query['username'];
        	var password = req.query['password'];
        	var sql  = `SELECT *
                        FROM Person 
                        WHERE Vorname = ? and Nachname = ?`;
            connection.query(sql, [username,password] , callback); 
        }
        
        
    };
}
