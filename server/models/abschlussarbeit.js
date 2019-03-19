exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var aID = req.query['aID']
            	
        	var sql  = `SELECT *
                        FROM abschlussarbeit 
                        WHERE ArbeitsID = ?`;
        	
            connection.query(sql,aID, callback);
        },
        getAll: () => {
        	var sql = `SELECT * 
            FROM abschlussarbeit; `;

            connection.query(sql, callback);
        },
        delete: (req) => {
        	var aID = req.query['aID']
        	
        	var sql = `DELETE  
                        FROM abschlussarbeit 
                        WHERE ArbeitsID = ?`;
        	
            connection.query(sql,aID, callback);
        },
        update: (req) => {
        	
        	var aID = req.query['aID']
        	const ins = {
        			Abstract: req.query['abstract'],
        			Titel: req.query['titel'],
        			Datum: req.query['date'],
        			Kategorie_KategorieID: req.query['kID'],
        			Studiengang_StudiengangID: req.query['sSID'],
        			Dozent_DozentID: req.query['dDID'],
        			Betreuer_Unternehmen_UnternehmensID: req.query['bUUID'],
        			Betreuer_Unternehmen_Adresse_AdressID: req.query['bUAAID'],
        			Student_PersonID:req.query['sPID']
        	}
        	
       	var sql = `UPDATE abschlussarbeit 
                   SET  ?
                   WHERE ArbeitsID = ?`;
            connection.query(sql,[ins,aID],callback);
            
        },
        
        //nach was hier suchen???
        find: (req) => {
        	connection.query(sql, callback);
        },
        add: (req) => {
        	//Tabellen Objekt
        	const ins = {
        			Abstract: req.query['abstract'],
        			Titel: req.query['titel'],
        			Datum: req.query['date'],
        			Kategorie_KategorieID: req.query['kID'],
        			Studiengang_StudiengangID: req.query['sSID'],
        			Dozent_DozentID: req.query['dDID'],
        			Betreuer_Unternehmen_UnternehmensID: req.query['bUUID'],
        			Betreuer_Unternehmen_Adresse_AdressID: req.query['bUAAID'],
        			Student_PersonID:req.query['sPID']
        	}
        	var sql = `INSERT INTO Abschlussarbeiten SET ? `
            connection.query(sql,ins,callback);
        },
      create: (req) => {
    	  	var sql = `CREATE TABLE IF NOT EXISTS AbschlussarbeitenDB.Abschlussarbeiten (
  Abstract VARCHAR(200) NOT NULL,
  Titel VARCHAR(45) NOT NULL,
  Beschreibung VARCHAR(45) NOT NULL,
  Datum DATE NOT NULL,
  Kategorie_KategorieID INT NOT NULL,
  Studiengang_StudiengangID INT NOT NULL,
  Dozent_DozentID INT NOT NULL,
  Betreuer_Unternehmen_UnternehmensID INT NOT NULL,
  Betreuer_Unternehmen_Adresse_AdressID INT NOT NULL,
  PRIMARY KEY (Kategorie_KategorieID, Studiengang_StudiengangID, Dozent_DozentID, Betreuer_Unternehmen_UnternehmensID, Betreuer_Unternehmen_Adresse_AdressID),
  INDEX fk_Abschlussarbeiten_Studiengang1_idx (Studiengang_StudiengangID ASC),
  INDEX fk_Abschlussarbeiten_Betreuer1_idx (Betreuer_Unternehmen_UnternehmensID ASC, Betreuer_Unternehmen_Adresse_AdressID ASC),
  CONSTRAINT fk_Abschlussarbeiten_Kategorie
    FOREIGN KEY (Kategorie_KategorieID)
    REFERENCES AbschlussarbeitDB.Kategorie (KategorieID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Abschlussarbeiten_Studiengang1
    FOREIGN KEY (Studiengang_StudiengangID)
    REFERENCES AbschlussarbeitDB.Studiengang (StudiengangID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Abschlussarbeiten_Betreuer1
    FOREIGN KEY (Betreuer_Unternehmen_UnternehmensID , Betreuer_Unternehmen_Adresse_AdressID)
    REFERENCES AbschlussarbeitDB.Betreuer (Unternehmen_UnternehmensID , Unternehmen_Adresse_AdressID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
`
    	  	  connection.query(sql,callback);
     
      }  
    };
}
