exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var pPID = req.query['pPID'];
          var sql = 'select r.PersonenID as personenID,r.Vorname as vorname, r.Nachname as nachname,r.geschlecht as geschlecht, ' +
                    'r.MAIL as mail, r.Firmenname as firmenname,r.RechtsformBez as rechtsform, bezeichnung as branche, r.straße as strasse, ' +
                    'r.Hausnummer as hausnummer, r.zusatz as zusatz, r.PLZ as plz, r.Ort as ort ' +
                    'from branche join ( select a.Firmenname as Firmenname, a.Straße as Straße, a.Hausnummer as Hausnummer,a.Zusatz as Zusatz, ' +
                    'a.PLZ as PLZ ,a.Ort as Ort,a.PersonenID as PersonenID,a.Vorname as Vorname,a.Nachname as Nachname,a.Geschlecht as Geschlecht, ' +
                    'a.MAIL as MAIL,a.adresseID,a.rechtsform as rechtsform,a.BrancheID as BrancheID, rechtsform.bezeichnung as RechtsformBez ' +
                    'from rechtsform join ( select u.Firmenname as Firmenname ,adresse.straße as Straße ,adresse.hausnummer as Hausnummer, ' +
                    'adresse.zusatz as Zusatz,adresse.postleitzahl as PLZ,adresse.ort as Ort, u.PersonenID as PersonenID, u.Vorname as Vorname , ' +
                    'u.Nachname as Nachname ,u.Geschlecht as Geschlecht ,u.MAIL as MAIL ,u.Adresse_AdressID as adresseID,u.Rechtsform_RechtsformID as rechtsform, ' +
                    'u.Branche_BranchenID as BrancheID from adresse join ( select p.personenID as PersonenID,p.vorname as Vorname,p.nachname as Nachname, ' +
                    'p.geschlecht as Geschlecht, p.`e-mail` as MAIL,u.Firmenname as Firmenname,u.Adresse_AdressID,u.Rechtsform_RechtsformID, ' +
                    'u.Branche_BranchenID from betreuer b join unternehmen u on u.UnternehmensID = b.unternehmen_unternehmensID JOIN person p ' +
                    'on p.personenID = b.person_personenID where b.person_personenID = ?) u on u.Adresse_AdressID = adresse.AdressID) a where RechtsformID = rechtsform  ) r where BranchenID = r.BrancheID';
          connection.query(sql,pPID, function(error,results){
              if (error){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else if (results.length > 0){
                return callback(null,JSON.stringify(results));
              } else {
                return callback(new Error("Falsche PersonenID angegeben"),null);
              }
            });
        },
        getAll: () => {
        	var sql = 'select r.PersonenID as personenID,r.Vorname as vorname, r.Nachname as nachname,r.geschlecht as geschlecht, ' +
                    'r.MAIL as mail, r.Firmenname as firmenname,r.RechtsformBez as rechtsform, bezeichnung as branche, r.straße as strasse, ' +
                    'r.Hausnummer as hausnummer, r.zusatz as zusatz, r.PLZ as plz, r.Ort as ort ' +
                    'from branche join ( select a.Firmenname as Firmenname, a.Straße as Straße, a.Hausnummer as Hausnummer,a.Zusatz as Zusatz, ' +
                    'a.PLZ as PLZ ,a.Ort as Ort,a.PersonenID as PersonenID,a.Vorname as Vorname,a.Nachname as Nachname,a.Geschlecht as Geschlecht, ' +
                    'a.MAIL as MAIL,a.adresseID,a.rechtsform as rechtsform,a.BrancheID as BrancheID, rechtsform.bezeichnung as RechtsformBez ' +
					          'from rechtsform join ( select u.Firmenname as Firmenname ,adresse.straße as Straße ,adresse.hausnummer as Hausnummer, ' +
                    'adresse.zusatz as Zusatz,adresse.postleitzahl as PLZ,adresse.ort as Ort, u.PersonenID as PersonenID, u.Vorname as Vorname , ' +
                    'u.Nachname as Nachname ,u.Geschlecht as Geschlecht ,u.MAIL as MAIL ,u.Adresse_AdressID as adresseID,u.Rechtsform_RechtsformID as rechtsform, ' +
                    'u.Branche_BranchenID as BrancheID from adresse join ( select p.personenID as PersonenID,p.vorname as Vorname,p.nachname as Nachname, ' +
                    'p.geschlecht as Geschlecht, p.`e-mail` as MAIL,u.Firmenname as Firmenname,u.Adresse_AdressID,u.Rechtsform_RechtsformID, ' +
                    'u.Branche_BranchenID from betreuer b join unternehmen u on u.UnternehmensID = b.unternehmen_unternehmensID JOIN person p ' +
                    'on p.personenID = b.person_personenID) u on u.Adresse_AdressID = adresse.AdressID) a where RechtsformID = rechtsform  ) r where BranchenID = r.BrancheID';
            connection.query(sql, function(error,results){
              if (error){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else{
                return callback(null,JSON.stringify(results));
              }
            });
        },
        delete: (req) => {
        	var pPID = req.query['pPID'];

        	var sql = `DELETE
                        FROM Betreuer
                        WHERE Person_PersonenID= ?`;
            connection.query(sql,pPID, callback);
        },
        update: (req) => {
        	const ins ={
        			Unternehmen_UnternehmensID : req.query['uUID']
        	}

        	var pPID = req.query['pPID'];

        	var sql = `UPDATE Betreuer
                        SET  ?
                        WHERE Person_PersonenID = ?`;
            connection.query(sql,[ins,pPID], function(error,results){
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
            });
        },
        add: (req) => {
        	const ins = {
        			Unternehmen_UnternehmensID: req.query['uUID'],
        			Person_PersonenID: req.query['pPID']
        	}

        	var sql = `INSERT INTO Betreuer SET ? `
            connection.query(sql,ins,function(error,results){
              if (error){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else{
                return callback(null,JSON.stringify(results));
              }
            });
        },
        //TODO: find und create anpassen
        find: (req) => {
            var sql = `SELECT *
                        FROM branche
                        WHERE Bezeichnung like ${req.param('bez').toString()}`;
            connection.query(sql, callback);
        },
        create: (req) => {
            var sql = `SELECT *
                        FORM branche
                        WHERE Bezeichnung = ? ${bez} ?`;
            connection.query(sql, callback);
        }
    };
}
