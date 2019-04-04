exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var pPID = req.query['pPID'];
          var sql = 'select gradID, bezeichnung, personenID, vorname, nachname,geschlecht, `e-mail` as email,StudiengangID as studiengangid,sBezeichnung,kategorieID,kBezeichnung,`akademischer grad_gradID` from `akademischer Grad` a inner join ( select personenID, vorname, nachname, geschlecht, `e-mail`, studiengangID, sBezeichnung, kategorie.kategorieID, kategorie.bezeichnung as kBezeichnung, `akademischer grad_gradID` from kategorie inner join ( select personenID, vorname, nachname,   geschlecht, `e-mail`, studiengang.StudiengangID, studiengang.bezeichnung as sBezeichnung,abschlussarbeiten_kategorie_kategorieID,`akademischer grad_gradID` from studiengang inner join ( select * from person p inner join student s on p.personenID = s.person_personenID) d on studiengang.studiengangID = d.abschlussarbeiten_studiengang_studiengangID ) g on kategorie.kategorieID = g.abschlussarbeiten_kategorie_kategorieID ) ka on a.gradID = ka.`akademischer grad_gradID` where personenID = ?'
          //var sql= 'select * from `akademischer Grad` a inner join ( select personenID, vorname, nachname, geschlecht, `e-mail`, studiengangID, sBezeichnung, kategorie.kategorieID, kategorie.bezeichnung as kBezeichnung, `akademischer grad_gradID` from kategorie inner join ( select personenID, vorname, nachname, geschlecht, `e-mail`, studiengang.StudiengangID, studiengang.bezeichnung as sBezeichnung,abschlussarbeiten_kategorie_kategorieID,`akademischer grad_gradID` from studiengang inner join //( select * from person p inner join student s on p.personenID = s.person_personenID) d on studiengang.studiengangID = d.abschlussarbeiten_studiengang_studiengangID ) g on kategorie.kategorieID = g.abschlussarbeiten_kategorie_kategorieID ) ka on a.gradID = ka.`akademischer grad_gradID` where personenID = ?';
            connection.query(sql,pPID, function(error,results){
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
          var sql= 'select gradID, bezeichnung, personenID, vorname, nachname,geschlecht, `e-mail` as email,StudiengangID as studiengangid,sBezeichnung,kategorieID,kBezeichnung,`akademischer grad_gradID` from `akademischer Grad` a inner join ( select personenID, vorname, nachname, geschlecht, `e-mail`, studiengangID, sBezeichnung, kategorie.kategorieID, kategorie.bezeichnung as kBezeichnung, `akademischer grad_gradID` from kategorie inner join ( select personenID, vorname, nachname, geschlecht, `e-mail`, studiengang.StudiengangID, studiengang.bezeichnung as sBezeichnung,abschlussarbeiten_kategorie_kategorieID,`akademischer grad_gradID` from studiengang inner join ( select * from person p inner join student s on p.personenID = s.person_personenID) d on studiengang.studiengangID = d.abschlussarbeiten_studiengang_studiengangID ) g on kategorie.kategorieID = g.abschlussarbeiten_kategorie_kategorieID ) ka on a.gradID = ka.`akademischer grad_gradID`';
            console.log(connection.query(sql));
            connection.query(sql, function(error,results){
              if (error){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else{
                return callback(null,JSON.stringify(results));
              }
            });
        },
        delete: (req) => {
        	var pPID = req.query['pPid'];
        	var sql = `DELETE
                        FROM Student
                        WHERE Person_PersonenID = ? ;`;

            connection.query(sql,pPID, callback);
        },
        update: (req) => {
        	var pPID = req.query['pPID'];
        	const ins = {
        			Matrikelnummer: req.query['mtnr'],
        			Studiengang_StudiengangID: req.query['sSID'],
        			'Akademischer Grad_GradID': req.query['aGGID'],
        			Abschlussarbeiten_Kategorie_KategorieID: req.query['aKKID'],
        			Abschlussarbeiten_Studiengang_StudiengangID: req.query['aSSID']
        	}
        	var sql = `UPDATE Student
                        SET  ?
                        WHERE Person_PersonenID = ?;`;
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
        			Person_PersonenID: req.query['pPID'],
        			Matrikelnummer: req.query['mtnr'],
        			Studiengang_StudiengangID: req.query['sSID'],
        			'Akademischer Grad_GradID': req.query['aGGID'],
        			Abschlussarbeiten_Kategorie_KategorieID: req.query['aKKID'],
        			Abschlussarbeiten_Studiengang_StudiengangID: req.query['aSSID']
        	}
        	var sql = `INSERT INTO Student SET ? `
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
