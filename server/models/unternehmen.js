exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	
        	var uID = req.query['uID'];
        	
            var sql  = `SELECT *
                        FROM unternehmen 
                        WHERE UnternehmensID = ?`;
            connection.query(sql,uID, callback);
        },
        getAll: () => {
        	var sql = `SELECT * 
            FROM Unternehmen; `;

            connection.query(sql, callback);
        },
        delete: (req) => {
        	var uID = req.query['uID'];
        	var sql = `DELETE  
                        FROM Unternehmen 
                        WHERE ? `;
            connection.query(sql,uID, callback);
        },
        add: (req) => {
        	const ins = {
        			  Firmenname: req.query['fname'],
        			  Adresse_AdressID: req.query['aaID'],
        			  Rechtsform_RechtsformID: req.query['rrID'],
        			  Branche_BranchenID: req.query['bbID'],
        			  }
        		var sql = `INSERT INTO Unternehmen SET ? `
                connection.query(sql,ins,callback);
            
        },
        
        update: (req) => {
const ins = {
		  Firmenname: req.query['fname'],
		  Adresse_AdressID: req.query['aaID'],
		  Rechtsform_RechtsformID: req.query['rrID'],
		  Branche_BranchenID: req.query['bbID'],
		  }
        var   uID = req.query['uID'];
		
			var sql = `UPDATE Unternehmen 
                        SET  ?
                        Where UnternehmensID = ?`;
            connection.query(sql,[ins,uID], callback);
        },
        find: (req) => {
            var sql = `SELECT * 
                        FROM branche 
                        WHERE Bezeichnung like ${req.param('bez').toString()}`;
            connection.query(sql, callback);
        },
        create: (req) => {
            var sql = `CREATE TABLE IF NOT EXISTS AbschlussarbeitenDB.Unternehmen (
  UnternehmensID INT NOT NULL AUTO_INCREMENT,
  Firmenname VARCHAR(45) NOT NULL,
  Adresse_AdressID INT NOT NULL,
  Rechtsform_RechtsformID INT NOT NULL,
  Branche_BranchenID INT NOT NULL,
  PRIMARY KEY (UnternehmensID, Adresse_AdressID, Rechtsform_RechtsformID, Branche_BranchenID),
  INDEX fk_Unternehmen_Adresse1_idx (Adresse_AdressID ASC),
  INDEX fk_Unternehmen_Rechtsform1_idx (Rechtsform_RechtsformID ASC),
  INDEX fk_Unternehmen_Branche1_idx (Branche_BranchenID ASC),
  CONSTRAINT fk_Unternehmen_Adresse1
    FOREIGN KEY (Adresse_AdressID)
    REFERENCES AbschlussarbeitDB.Adresse (AdressID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Unternehmen_Rechtsform1
    FOREIGN KEY (Rechtsform_RechtsformID)
    REFERENCES AbschlussarbeitDB.Rechtsform (RechtsformID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Unternehmen_Branche1
    FOREIGN KEY (Branche_BranchenID)
    REFERENCES AbschlussarbeitDB.Branche (BranchenID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`;
            connection.query(sql, callback);
        }
    };
}
