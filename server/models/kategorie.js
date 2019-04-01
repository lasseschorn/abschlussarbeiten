exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	//richtige variable eintagen
        	var kID = req.query['kID'];
            var sql  = `select *
            from Kategorie
            where KategorieID = ? `
            connection.query(sql,kID, function(error,results){
              if (error){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else if (results.length > 0){
                return callback(null,JSON.stringify(results));
              } else {
                return callback(new Error("Falsche ID angegeben"),null);
              }
            } );
        },
        getAll: () => {
        	var sql = `SELECT *
            FROM kategorie; `;
            connection.query(sql, function(error,results){
              if (error){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else{
                return callback(null,JSON.stringify(results));
              }
            });
        },
        delete: (req) => {
        	var kID = req.query['kID'];
        	var sql = `DELETE
                        FROM Kategorie
                        WHERE KategorieID = ?`;
        	console.log(sql);
            connection.query(sql,kID, callback);
        },
        update: (req) => {
        	var bez = req.query['bez'];
        	var kID = req.query['kID'];
        	var sql = `UPDATE Kategorie
                        SET  Bezeichnung = ?
                        WHERE KategorieID = ?`;
            connection.query(sql,[bez, kID] ,function(error,results){
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

        add: (req) => {
        	const ins = {
        			Bezeichnung: req.query['bez']
        	}
        	var sql = `INSERT INTO Kategorie SET ? `
            connection.query(sql,ins,function(error,results){
              if (error){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else{
                return callback(null,JSON.stringify(results));
              }
            });

        },


        //TODO: find und create anpassen
        find: (req) => {
            var sql = `SELECT *
                        FROM branche
                        WHERE Bezeichnung like ${req.param('bez').toString()}`;
            connection.query(sql, callback);
        },


        create: (req) => {
            var sql = `CREATE TABLE IF NOT EXISTS AbschlussarbeitenDB.Kategorie (
            		   KategorieID INT NOT NULL AUTO_INCREMENT,
            		   Bezeichnung VARCHAR(45) NULL DEFAULT NULL,
            		   PRIMARY KEY (KategorieID))
            		   ENGINE = InnoDB;`;
            connection.query(sql, callback);
        }
    };
}
