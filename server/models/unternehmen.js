exports.method =
function(connection, callback) {
  return {
    getById: (req) => {

      var uID = req.query['uID'];

      var sql  = `select *
from (
select branche.BranchenID, branche.Bezeichnung as BBzeichnung, r.RechtsformID, r.Bezeichnung, UnternehmensID, Firmenname, AdressID, Straße, Hausnummer, Zusatz, Postleitzahl, Ort
from branche join ( select *
from rechtsform join (	select *
						from unternehmen
						join adresse	WHERE Adresse_AdressID = AdressID) a
where RechtsformID = Rechtsform_RechtsformID ) r
where BranchenID = Branche_BranchenID
) u
where UnternehmensID = ?`;
      connection.query(sql,uID, function(error, results) {
        if (error){
          return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
        } else if (results.length > 0){
          return callback(null,JSON.stringify(results));
        } else {
          return callback(new Error("Falsche ID angegeben"),null);
        }
      });
    },
    getAll: () => {
      var sql = `select branche.BranchenID, branche.Bezeichnung, r.RechtsformID, r.Bezeichnung, UnternehmensID, Firmenname, AdressID, Straße, Hausnummer, Zusatz, Postleitzahl, Ort
from branche join ( select *
from rechtsform join (select *
from unternehmen join adresse
WHERE Adresse_AdressID = AdressID) a
where RechtsformID = Rechtsform_RechtsformID ) r
where BranchenID = Branche_BranchenID `;

      connection.query(sql, function(error,results) {
        if (error){
          return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
        } else{
          return callback(null,JSON.stringify(results));
        }
      });
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
      connection.query(sql,ins,function(error,results){
        if (error){
          return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
        } else{
          return callback(null,JSON.stringify(results));
        }
      });

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
      connection.query(sql,[ins,uID], function(error,results){
        if(error){
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
      } );
    },
    find: (req) => {
      var sql = `SELECT *
      FROM Unternehmen
      WHERE Firmenname like ${req.param('bez').toString()}%`;
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
