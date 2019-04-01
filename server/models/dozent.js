exports.method =
function(connection, callback) {
  return {
    getById: (req) => {
      var pPID = req.query['pPID'];
      var sql  = `SELECT *
      FROM dozent
      WHERE Person_PersonenID = ? ;`;
      connection.query(sql,pPid, function(error,results){
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
      var sql = `SELECT *
      FROM dozent; `;
      connection.query(sql, function(error,results){
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
