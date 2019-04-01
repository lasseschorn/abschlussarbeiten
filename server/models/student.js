exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var pPID = req.query['pPID'];
            var sql  = `SELECT *
                        FROM student
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
            FROM student; `;
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
                        FROM Student
                        WHERE Person_PersonenID = ? ;`;

            connection.query(sql,pPid, callback);
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
