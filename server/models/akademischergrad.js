exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var gID = req.query['gID'];
            var sql  = 'SELECT *'
                        +'FROM `akademischer grad`'
                        + 'WHERE GradID = ?;';
            connection.query(sql,gID, callback);
        },
        getAll: () => {
        	var sql = 'SELECT *'
        		+ 'FROM `akademischer grad`; ';

            connection.query(sql, callback);
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
            connection.query(sql,[bez,gID], callback);
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
