exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	//richtige variable eintagen
        	var sID = req.query['sID'];
            var sql  = `select *
            from Studiengang
            where StudiengangID = ? `
            connection.query(sql,sID, function(erorr,results){
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
            FROM Studiengang; `;
            connection.query(sql, function(error,results){
              if (err){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else{
                return callback(null,JSON.stringify(results));
              }
            });
        },
        delete: (req) => {
        	var sID = req.query['sID'];
        	var sql = `DELETE
                        FROM Studiengang
                        WHERE StudiengangID = ?`;
        	console.log(sql);
            connection.query(sql,sID, callback);
        },
        update: (req) => {
        	var bez = req.query['bez'];
        	var sID = req.query['sID'];
        	var sql = `UPDATE Studiengang
                        SET  Bezeichnung = ?
                        WHERE StudiengangID = ?`;
            connection.query(sql,[bez, sID] ,function(error,results){
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

        add: (req) => {
        	const ins = {
        			Bezeichnung: req.query['bez']
        	}
        	var sql = `INSERT INTO Studiengang SET ? `
            connection.query(sql,ins,function(erorr,results){
              if (err){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else{
                return callback(null,JSON.stringify(results));
              }
            });

        },


        //TODO: find anpassen
        find: (req) => {
            var sql = `SELECT *
                        FROM branche
                        WHERE Bezeichnung like ${req.param('bez').toString()}`;
            connection.query(sql, callback);
        },


        create: (req) => {
            var sql = `CREATE TABLE IF NOT EXISTS AbschlussarbeitenDB.Studiengang (
            StudiengangID INT NOT NULL AUTO_INCREMENT,
            Bezeichnung VARCHAR(45) NOT NULL,
            PRIMARY KEY (StudiengangID))
            ENGINE = InnoDB;`;
            connection.query(sql, callback);
        }
    };
}
