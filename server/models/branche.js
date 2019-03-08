exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var bID = req.query['bID'];
        	var sql  = `SELECT *
                        FROM branche 
                        WHERE BranchenID = ?`;
            
            connection.query(sql,bID, callback);
        },
        getAll: () => {
            var sql = `SELECT * 
            FROM branche; `;
            connection.query(sql, callback);
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
        	
            connection.query(sql,[bez,bid], callback);
        },
        find: (req) => {
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
                connection.query(sql,ins,callback);
            
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
