exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var gID = req.query['gID'];
            var sql  = 'SELECT *'
                        +'FROM `akademischer grad`'
                        + 'WHERE GradID = ?;';
            connection.query(sql,gID, function(err,results){
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
        	var sql = 'SELECT *'
        		+ 'FROM `akademischer grad`; ';

            connection.query(sql, function(err,results){
              if (err){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else{
                return callback(null,JSON.stringify(results));
              }
            });
        },
        delete: (req) => {
        	var gID = req.query['gID'];
        	var sql = 'DELETE'
                       +'FROM  `akademischer grad`'
                        + 'WHERE GradID = ?; ';
            connection.query(sql,gID, callback);
        },
        update: (req) => {
        	var gID = req.query['gID'];
        	var bez = req.query['bez'];
        	var sql = 'UPDATE `akademischer grad`'
                       + 'SET  Bezeichnung = ?'
                        + 'WHERE GradID = ?';
            connection.query(sql,[bez,gID], function(err,results){
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
          var sql = 'INSERT INTO `akademischer grad` SET ?'
            connection.query(sql,ins,function(error,results){
              if (err){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else{
                return callback(null,JSON.stringify(results));
              }
            });
        },
        //TODO: Anpassen
        find: (req) => {
            var sql = `SELECT *
                        FROM branche
                        WHERE Bezeichnung like ${req.param('bez').toString()}`;
            connection.query(sql, callback);
        },
        create: (req) => {

        	var sql = `CREATE TABLE IF NOT EXISTS AbschlussarbeitenDB.akademischergrad (
  GradID INT NOT NULL AUTO_INCREMENT,
  Bezeichnung VARCHAR(45) NOT NULL,
  PRIMARY KEY (GradID))
ENGINE = InnoDB;`;
            connection.query(sql, callback);
        }
    };
}
