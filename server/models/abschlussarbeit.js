exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var sql  = `SELECT *
                        FROM abschlussarbeit 
                        WHERE Dozent_DozentID = ?`;
        	
            connection.query(sql,req.query['id'], callback);
        },
        getAll: () => {
        	//namen anpassen der tabelle
        	var sql = `SELECT * 
            FROM abschlussarbeit; `;
//            connection.query("SELECT * FROM branche", function (err, result, fields) {
//                if (err) throw err;
//                console.log(result);
//              });
            connection.query(sql, callback);
        },
        delete: (req) => {
        	var sql = `DELETE  
                        FROM branche 
                        WHERE BranchenID = ${req.param('id').toString()}; `;
        	console.log(sql);
            connection.query(sql, callback);
        },
        update: (req) => {
        	
        	//variablen deklaration nur query[' hier variablen der oberfläche eintragen']
        	var aID = req.query['aID']
        	var abstract = req.query['abstract'];
        	var titel = req.query['titel'];
        	var datum = req.query['date'];
        	var kID = req.query['kID'];
        	var sID = req.query['sID'];
        	var dID = req.query['dID'];
        	var bUUID = req.query['bUUID'];
        	var bUAAID = req.query['bUAAID'];
        	var sPID = req.query['sPID'];
        	
        	//Tabellen Objekt
        	//Datum fehlt noch
        	const ins = {
        			ArbeitsID: aID,
        			Abstract: abstract,
        			Titel: titel,
        			Kategorie_KategorieID: kID,
        			Studiengang_StudiengangID: sID,
        			Dozent_DozentID: dID,
        			Betreuer_Unternehmen_UnternehmensID: bUUID,
        			Betreuer_Unternehmen_Adresse_AdressID: bUAAID,
        			Student_PersonID: sPID,
        	}
       	var sql = `UPDATE abschlussarbeit 
                   SET  ?`;
            connection.query(sql,ins,callback);
            
        },
        
        //nach was hier suchen???
        find: (req) => {
        	connection.query(sql, callback);
        },
        add: (req) => {
        	var aID = req.query['aID']
        	var abstract = req.query['abstract'];
        	var titel = req.query['titel'];
        	var datum = req.query['date'];
        	var kID = req.query['kID'];
        	var sID = req.query['sID'];
        	var dID = req.query['dID'];
        	var bUUID = req.query['bUUID'];
        	var bUAAID = req.query['bUAAID'];
        	var sPID = req.query['sPID'];
        	
        	//Tabellen Objekt
        	//Datum fehlt noch
        	const ins = {
        			Abstract: abstract,
        			Titel: titel,
        			
        			Kategorie_KategorieID: kID,
        			Studiengang_StudiengangID: sID,
        			Dozent_DozentID: dID,
        			Betreuer_Unternehmen_UnternehmensID: bUUID,
        			Betreuer_Unternehmen_Adresse_AdressID: bUAAID,
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
