exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var rID = req.query['rID'];
        	var sql  = `SELECT *
                        FROM rechtsform
                        WHERE RechtformID = ? ;`;
            connection.query(sql,rID, function(error,results){
              if (err){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else if (results.length > 0){
                return callback(null,JSON.stringify(results));
              } else {
                return callback(new Error("Falsche ID angegeben"),null);
              }
            });
        },
        getAll: () => {
        	var sql = `SELECT *
            FROM Rechtsform; `;
            connection.query(sql, function(error,results){
              if (err){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else{
                return callback(null,JSON.stringify(results));
              }
            });
        },
        delete: (req) => {
        	var rID = req.query['rID'];
        	var sql = `DELETE
                        FROM Rechtsform
                        WHERE RechtsformID = ?; `;
        	console.log(sql);
            connection.query(sql,rID, callback);
        },
        update: (req) => {
			var rID = req.query['rID'];

        	const ins = {
         			Bezeichnung: req.query['bez']
        	}
        	var sql = `UPDATE Rechtsform
                        SET  ?
                        WHERE RechtsformID = ?`;
            connection.query(sql,[ins,rID], function(error,results){
              if(err){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else {
                  if (results.changedRows == 0) {
                      if (results.affectedRows == 0) {
                        return callback(new Error("Die angegebene ID wurde nicht gefunden."),null)
                      } else {
                        return callback(new Error("Es wurden keine änderungen vorgenommen"),null)
                  }} else {
                      return callback(null,JSON.stringify(results))
                  }
              }
            });
        },
        //TODO: anpassen
        find: (req) => {
            var sql = `SELECT *
                        FROM branche
                        WHERE Bezeichnung like ${req.param('bez').toString()}`;
            connection.query(sql, callback);
        },
        add: (req) =>{
        	const ins = {
        			Bezeichnung: req.query['bez']
        	}
        	var sql = `INSERT INTO Rechtsform SET ? `
                connection.query(sql,ins,function(error,results){
                  if (err){
                    return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
                  } else{
                    return callback(null,JSON.stringify(results));
                  }
                });

        },
        create: (req) => {
            var sql = `CREATE TABLE IF NOT EXISTS AbschlussarbeitenDB.Rechtsform (
  RechtsformID INT NOT NULL AUTO_INCREMENT,
  Bezeichnung VARCHAR(15) NOT NULL,
  PRIMARY KEY (RechtsformID))
ENGINE = InnoDB;`;
            connection.query(sql, callback);
        }
    };
}
