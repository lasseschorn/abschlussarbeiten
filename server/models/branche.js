exports.method =
function(connection, callback) {
    return {
        getById: (req) => {

          var bID = req.query['bID'];
        	var sql  = `SELECT *
                        FROM branche
                        WHERE BranchenID = ?`;
        connection.query(sql,bID,function(error, results){
          if (error){
            return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
          } else if (results.length > 0){
            return callback(null,JSON.stringify(results));
          } else {
            return callback(new Error("Falsche ID angegeben"),null);
          }

//          callback(err,JSON.stringify(rows));
        });
        },
        getAll: () => {
            var sql = `SELECT *
            FROM branche; `;
            connection.query(sql,function(error,results){
            if (error){
              return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
            } else{
              return callback(null,JSON.stringify(results));
            }
            //callback(err,JSON.stringify(results));
            });
        },
        delete: (req) => {
        	var bID = req.query['bID'];
            var sql = `DELETE
                        FROM branche
                        WHERE BranchenID = ? `;
          connection.query(sql,bID, callback);

        },
        update: (req) => {
        	var	bez =  req.query['bez'];
        	var bID =  req.query['bID'];

        	var sql = `UPDATE Branche
                        SET  Bezeichnung = ?
                        WHERE BranchenID = ? `;

            connection.query(sql,[bez,bID], function(error,results) {
              if(error){
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
        find: (req) => {
          //ikkkk
        	//hier variable einfügen
        	var bezeichnung = req.query['bez'];

        	var sql = `SELECT *
                        FROM Branche
                        WHERE Bezeichnung like ` + bezeichnung;
            connection.query(sql, callback);
        },
        add: (req) => {
            	const ins = {
            			Bezeichnung: req.query['bez']
            	}
            	var sql = `INSERT INTO Branche SET ? `
                connection.query(sql,ins,function(error,results){
                  if (error){
                    return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
                  } else{
                    return callback(null,JSON.stringify(results));
                  }
                });

        },
        create: (req) => {

        	var sql = `CREATE TABLE IF NOT EXISTS AbschlussarbeitenDB.Branche (
  BranchenID INT NOT NULL AUTO_INCREMENT,
  Bezeichnung VARCHAR(45) NOT NULL,
  PRIMARY KEY (BranchenID))
ENGINE = InnoDB;`;
            connection.query(sql, callback);
        }
    };
}
