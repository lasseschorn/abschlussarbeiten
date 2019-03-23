exports.method =
function(connection, callback) {
    return {
        getById: (req) => {

    //Hier die richtigen variablennamen einsetzen
        	var aID = req.query['aID'];
        	var sql  = `SELECT *
                        FROM Adresse
                        WHERE AdressID = ?`;
            connection.query(sql, aID , function(err,results){
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
            FROM adresse; `;
            connection.query(sql, function(err,results){
              if (err){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else{
                return callback(null,JSON.stringify(results));
              }
            });
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
            connection.query(sql,[ins,aID],function(err,results){
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
                        FROM Adresse
                        WHERE Straße like ${req.param('bez').toString()}`;
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
