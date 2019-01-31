exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	
        	
        	//sicherer für SQL injection vielleicht noch prüfen ob param nur zahlen enthält?? 
        	//connection escape funktioniert nicht 
            var sql  = `SELECT *
                        FROM branche 
                        WHERE BranchenID = ?`;
            //Hier die richtigen variablennamen einsetzen
        	
            connection.query(sql,req.query['id'], callback);
        },
        getAll: () => {
            var sql = `SELECT * 
            FROM branche; `;
            connection.query(sql, callback);
        },
        delete: (req) => {
        	console.log("getDelete");
            var sql = `DELETE  
                        FROM branche 
                        WHERE BranchenID = ${req.param('id').toString()}; `;
        	console.log(sql);
            connection.query(sql, callback);
        },
        update: (req) => {
        	//Hier eintragen beide id backslashes drin falls man beide mit placeholder macht lösung ???
        	
        	var sql = `UPDATE branche 
                        SET  Bezeichnung = ` + req.query['bez'] +
                        `WHERE BranchenID = ?`;
        	
            connection.query(sql,req.query['id'], callback);
        },
        find: (req) => {
        	//hier variable einfügen
          
        	var sql = `SELECT * 
                        FROM branche 
                        WHERE Bezeichnung like ` + req.query['bez'];
            connection.query(sql, callback);
        },
        create: (req) => {
        	
        	var bez = req.query['bez'];
            var sql = `INSERT INTO branche (Bezeichnung)
            		   VALUES (?)`;
            connection.query(sql,bez, callback);
        }
    };
}
