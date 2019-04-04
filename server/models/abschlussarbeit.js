exports.method =
function(connection, callback) {
  return {
    getById: (req) => {
      var aID = req.query['aID']

      var sql  = `select Abstract, Titel, Datum, KategorieID, KBezeichnung as Kategorie, Studiengang_StudiengangID as StudiengangID, Bezeichnung as Studiengang, dozent_personID as DozentID, DVorname, DNachname, Betreuer_Unternehmen_UnternehmensID as UnternehmensID, Firmenname, Betreuer_Unternehmen_Adresse_AdressID as AdressID, Straße, Hausnummer, Zusatz, Postleitzahl, Ort, Student_PersonID as StudentID, Vorname, Nachname, ArbeitsID
from person join
    (select *
    from adresse right join
        ( select *
        from unternehmen right join
            ( select Abstract, Titel, Datum, KategorieID, KBezeichnung,  Studiengang_StudiengangID,Bezeichnung, dozent_personID, Vorname as DVorname, Nachname as DNachname, Betreuer_Unternehmen_UnternehmensID, Betreuer_Unternehmen_Adresse_AdressID, Student_PersonID, ArbeitsID
            from person join
                ( select *
                from studiengang join
                    ( select Abstract, Titel, Datum, KategorieID, Bezeichnung as KBezeichnung, Studiengang_StudiengangID, dozent_personID, Betreuer_Unternehmen_UnternehmensID, Betreuer_Unternehmen_Adresse_AdressID, Student_PersonID, ArbeitsID
					from kategorie join (
					select * from abschlussarbeit where arbeitsID = ? )
					a where KategorieID = Kategorie_KategorieID) k
                where StudiengangID = Studiengang_StudiengangID ) s
            where personenID = dozent_personID  ) d
        on UnternehmensID = Betreuer_Unternehmen_UnternehmensID ) u
    on AdressID = Betreuer_Unternehmen_Adresse_AdressID ) a
where person.PersonenID = Student_PersonID`;

      connection.query(sql,aID, function(error,results) {
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
      var sql = `select Abstract, Titel, Datum, KategorieID, KBezeichnung as Kategorie, Studiengang_StudiengangID as StudiengangID, Bezeichnung as Studiengang, dozent_personID as DozentID, DVorname, DNachname, Betreuer_Unternehmen_UnternehmensID as UnternehmensID, Firmenname, Betreuer_Unternehmen_Adresse_AdressID as AdressID, Straße, Hausnummer, Zusatz, Postleitzahl, Ort, Student_PersonID as StudentID, Vorname, Nachname, ArbeitsID
from person join
    (select *
    from adresse right join
        ( select *
        from unternehmen right join
            ( select Abstract, Titel, Datum, KategorieID, KBezeichnung,  Studiengang_StudiengangID,Bezeichnung, dozent_personID, Vorname as DVorname, Nachname as DNachname, Betreuer_Unternehmen_UnternehmensID, Betreuer_Unternehmen_Adresse_AdressID, Student_PersonID, ArbeitsID
            from person join
                ( select *
                from studiengang join
                    ( select Abstract, Titel, Datum, KategorieID, Bezeichnung as KBezeichnung, Studiengang_StudiengangID, dozent_personID, Betreuer_Unternehmen_UnternehmensID, Betreuer_Unternehmen_Adresse_AdressID, Student_PersonID, ArbeitsID
					from kategorie join (
					select * from abschlussarbeit)
					a where KategorieID = Kategorie_KategorieID) k
                where StudiengangID = Studiengang_StudiengangID ) s
            where personenID = dozent_personID  ) d
        on UnternehmensID = Betreuer_Unternehmen_UnternehmensID ) u
    on AdressID = Betreuer_Unternehmen_Adresse_AdressID ) a
where person.PersonenID = Student_PersonID
`;

      connection.query(sql, function(error,results){
        if (error){
          return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
        } else{
          return callback(null,JSON.stringify(results));
        }
      });
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
      connection.query(sql,[ins,aID],function(error,results){
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

    //nach was hier suchen???
    findByStudiengang: (req) => {
      var sID = req.query['sID']
      var sql = `select Abstract, Titel, Datum, KategorieID, KBezeichnung as Kategorie, Studiengang_StudiengangID as StudiengangID, Bezeichnung as Studiengang, dozent_personID as DozentID, DVorname, DNachname, Betreuer_Unternehmen_UnternehmensID as UnternehmensID, Firmenname, Betreuer_Unternehmen_Adresse_AdressID as AdressID, Straße, Hausnummer, Zusatz, Postleitzahl, Ort, Student_PersonID as StudentID, Vorname, Nachname, ArbeitsID
from person join
    (select *
    from adresse right join
        ( select *
        from unternehmen right join
            ( select Abstract, Titel, Datum, KategorieID, KBezeichnung,  Studiengang_StudiengangID,Bezeichnung, dozent_personID, Vorname as DVorname, Nachname as DNachname, Betreuer_Unternehmen_UnternehmensID, Betreuer_Unternehmen_Adresse_AdressID, Student_PersonID, ArbeitsID
            from person join
                ( 	select *
					from studiengang join
						( select Abstract, Titel, Datum, KategorieID, Bezeichnung as KBezeichnung, Studiengang_StudiengangID, dozent_personID, Betreuer_Unternehmen_UnternehmensID, Betreuer_Unternehmen_Adresse_AdressID, Student_PersonID, ArbeitsID
						from kategorie join (
							select *
							from abschlussarbeit)
							a where KategorieID = Kategorie_KategorieID) k
                where StudiengangID = Studiengang_StudiengangID
				        and	StudiengangID = ? 			) s
            where personenID = dozent_personID  ) d
        on UnternehmensID = Betreuer_Unternehmen_UnternehmensID ) u
    on AdressID = Betreuer_Unternehmen_Adresse_AdressID ) a
where person.PersonenID = Student_PersonID`;
      connection.query(sql,sID, function(error, results){
        if (error){
          return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
        } else if (results.length > 0){
          return callback(null,JSON.stringify(results));
        } else {
          return callback(new Error("Es existiert keine Arbeit mit dem angegeben Studiengang"),null);
        }
        });
    },
    findByKategorie: (req) => {
      var kID = req.query['kID']
      var sql = `select Abstract, Titel, Datum, KategorieID, KBezeichnung as Kategorie, Studiengang_StudiengangID as StudiengangID, Bezeichnung as Studiengang, dozent_personID as DozentID, DVorname, DNachname, Betreuer_Unternehmen_UnternehmensID as UnternehmensID, Firmenname, Betreuer_Unternehmen_Adresse_AdressID as AdressID, Straße, Hausnummer, Zusatz, Postleitzahl, Ort, Student_PersonID as StudentID, Vorname, Nachname, ArbeitsID
from person join
    (select *
    from adresse right join
        ( select *
        from unternehmen right join
            ( select Abstract, Titel, Datum, KategorieID, KBezeichnung,  Studiengang_StudiengangID,Bezeichnung, dozent_personID, Vorname as DVorname, Nachname as DNachname, Betreuer_Unternehmen_UnternehmensID, Betreuer_Unternehmen_Adresse_AdressID, Student_PersonID, ArbeitsID
            from person join
                ( 	select *
					from studiengang join
						( select Abstract, Titel, Datum, KategorieID, Bezeichnung as KBezeichnung, Studiengang_StudiengangID, dozent_personID, Betreuer_Unternehmen_UnternehmensID, Betreuer_Unternehmen_Adresse_AdressID, Student_PersonID, ArbeitsID
						from kategorie join (
							select *
							from abschlussarbeit) a
							where KategorieID = Kategorie_KategorieID
							and kategorie.KategorieID = ?) k
                where StudiengangID = Studiengang_StudiengangID ) s
            where personenID = dozent_personID  ) d
        on UnternehmensID = Betreuer_Unternehmen_UnternehmensID ) u
    on AdressID = Betreuer_Unternehmen_Adresse_AdressID ) a
where person.PersonenID = Student_PersonID`;
      connection.query(sql,kID, function(error, results){
        if (error){
          return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
        } else if (results.length > 0){
          return callback(null,JSON.stringify(results));
        } else {
          return callback(new Error("Es existiert keine Arbeit mit der angegeben Kategorie "),null);
        }
        });
    },
    findByKategorieAndStudiengang: (req) => {
      var kID = req.query['kID'];
      var sID = req.query['sID'];
      var sql = `select Abstract, Titel, Datum, KategorieID, KBezeichnung as Kategorie, Studiengang_StudiengangID as StudiengangID, Bezeichnung as Studiengang, dozent_personID as DozentID, DVorname, DNachname, Betreuer_Unternehmen_UnternehmensID as UnternehmensID, Firmenname, Betreuer_Unternehmen_Adresse_AdressID as AdressID, Straße, Hausnummer, Zusatz, Postleitzahl, Ort, Student_PersonID as StudentID, Vorname, Nachname, ArbeitsID
from person join
    (select *
    from adresse right join
        ( select *
        from unternehmen right join
            ( select Abstract, Titel, Datum, KategorieID, KBezeichnung,  Studiengang_StudiengangID,Bezeichnung, dozent_personID, Vorname as DVorname, Nachname as DNachname, Betreuer_Unternehmen_UnternehmensID, Betreuer_Unternehmen_Adresse_AdressID, Student_PersonID, ArbeitsID
            from person join
                ( 	select *
					from studiengang join
						( select Abstract, Titel, Datum, KategorieID, Bezeichnung as KBezeichnung, Studiengang_StudiengangID, dozent_personID, Betreuer_Unternehmen_UnternehmensID, Betreuer_Unternehmen_Adresse_AdressID, Student_PersonID, ArbeitsID
						from kategorie join (
							select *
							from abschlussarbeit) a
							where KategorieID = Kategorie_KategorieID
							and kategorie.KategorieID = ?) k
                where StudiengangID = Studiengang_StudiengangID
				and studiengang.StudiengangID = ?) s
            where personenID = dozent_personID  ) d
        on UnternehmensID = Betreuer_Unternehmen_UnternehmensID ) u
    on AdressID = Betreuer_Unternehmen_Adresse_AdressID ) a
where person.PersonenID = Student_PersonID`;
      connection.query(sql,[kID,sID], function(error, results){
        if (error){
          return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
        } else if (results.length > 0){
          return callback(null,JSON.stringify(results));
        } else {
          return callback(new Error("Es existiert keine arbeit mit den Kreterien"),null);
        }
        });
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
      connection.query(sql,ins,function(error,results){
        if (error){
          return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
        } else{
          return callback(null,JSON.stringify(results));
        }
      });
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
