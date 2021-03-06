exports.method =
function(connection, callback) {
  return {
    getById: (req) => {
      var pPID = req.query['pPID'];
      var sql  = 'select p.personenID as personenID, ad.bezeichnung as bezeichnung,p.vorname as vorname,p.nachname as nachname,p.geschlecht as geschlecht,p.`e-mail` as email from dozent d join `akademischer grad` ad on ad.gradID = d.`akademischer grad_gradID` join person p on d.person_personenID = p.personenID where d.person_personenID = ?';
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
          var sql1 = 'select p.personenID as personenID, ad.bezeichnung as bezeichnung,p.vorname as vorname,p.nachname as nachname,p.geschlecht as geschlecht,p.`e-mail` as email from dozent d join `akademischer grad` ad on ad.gradID = d.`akademischer grad_gradID` join person p on d.person_personenID = p.personenID'


      connection.query(sql1, function(error,results){
        if (error){
          return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
        } else{
          return callback(null,JSON.stringify(results));
        }
      });
    },
    delete: (req) => {
      var pPId = req.query['pPid'];
      var sql = `DELETE
      FROM dozent
      WHERE Person_PersonenID = ? ;`;

      connection.query(sql,pPid, callback);
    },
    update: (req) => {
      var pPID = req.query['pPID'];
      const ins = {
        'Akademischer Grad_GradID':req.query['aGGID']
      }
      var sql = `UPDATE dozent
      SET  ?
      WHERE Person_PersonenID = ?;`;
      connection.query(sql,[ins,pPid], function(error,results){
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
          'Akademischer Grad_GradID': req.query['aGGID'],
          Person_PersonenID:req.query['pPID']
        }
        var sql = `INSERT INTO dozent SET ? `
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
