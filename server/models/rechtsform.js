exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var rID = req.query['rID'];
        	var sql  = `SELECT *
                        FROM rechtsform
                        WHERE RechtformID = ? ;`;
            connection.query(sql,rID, callback);
        },
        getAll: () => {
        	var sql = `SELECT *
            FROM Rechtsform; `;
            connection.query(sql, callback);
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
            connection.query(sql,[ins,rID], callback);
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
                connection.query(sql,ins,callback);

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
