exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	
    //Hier die richtigen variablennamen einsetzen        	
        	var aID = req.query['aID'];
        	var sql  = `SELECT *
                        FROM Adresse 
                        WHERE AdressID = ?`;
            connection.query(sql, aID , callback);
        },
        getAll: () => {
        	var sql = `SELECT * 
            FROM adresse; `;
            connection.query(sql, callback);
        },
        delete: (req) => {
        	var aID = req.query['aID'];
        	var sql = `DELETE  
                        FROM adresse 
                        WHERE AdressID = ? `;
        	connection.query(sql,aID, callback);
        },
        update: (req) => {
        	var  aID = req.query['aID'];
            
        	const ins = {
        		Straße: req.query['str'],
        		Hausnummer: req.query['hnr'],
        		Zusatz: req.query['Zusatz'],
        		Postleitzahl: req.query['plz'],
        		Ort: req.query['ort'],
         	}
        	
        	var sql = `UPDATE Adresse
        	SET ?
        	WHERE AdressID = ?` 
            connection.query(sql,[ins,aID],callback);
        },
        add: (req) =>{
        	const ins = {
            		Straße: req.query['str'],
            		Hausnummer: req.query['hnr'],
            		Zusatz: req.query['Zusatz'],
            		Postleitzahl: req.query['plz'],
            		Ort: req.query['ort'],
            	}
        	var sql = `INSERT INTO Adresse SET ? `
                connection.query(sql,ins,callback);
            	
        },
        find: (req) => {
            var sql = `SELECT * 
                        FROM branche 
                        WHERE Bezeichnung like ${req.param('bez').toString()}`;
            connection.query(sql, callback);
        },
        create: (req) => {
            var sql = `CREATE TABLE IF NOT EXISTS AbschlussarbeitenDB.Adresse (
  AdressID INT NOT NULL AUTO_INCREMENT,
  Straße VARCHAR(45) NOT NULL,
  Hausnummer INT(4) NOT NULL,
  Zusatz VARCHAR(1) NULL,
  Postleitzahl INT(5) NOT NULL,
  Ort VARCHAR(45) NOT NULL,
  PRIMARY KEY (AdressID))
ENGINE = InnoDB;`;
            connection.query(sql, callback);
        }
    };
}
