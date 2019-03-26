exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var pID = req.query['pID'];
            var sql  = `SELECT *
                        FROM person
                        WHERE PersonenID = ?`
            connection.query(sql,pID, function(error,results){
              if (err){
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
            FROM person; `;
            connection.query(sql, function(error,results){
              if (err){
                return callback(new Error("SQL-Query konnte nicht ausgeführt werden"),null);
              } else{
                return callback(null,JSON.stringify(results));
              }
            });
        },
        delete: (req) => {
        	var pID = req.query['pID'];
        	var sql = `DELETE
                        FROM Person
                        WHERE PersonenID = ?; `;
            connection.query(sql,pID, callback);
        },
        update: (req) => {
        	const ins = {
        			Vorname: req.query['vname'],
        			Nachname: req.query['nname'],
        			Geschlecht: req.query['gs'],
        			'E-Mail': req.query['email']

        	}
        	var pID = req.query['pID'];
        	var sql = `UPDATE Person
                        SET  ?
                        WHERE PersonenID = ?`;
            connection.query(sql,[ins,pID], function(error,results){
              if(err){
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
        			Vorname: req.query['vname'],
        			Nachname: req.query['nname'],
        			Geschlecht: req.query['gs'],
        			'E-Mail': req.query['email']
        	}

        	var sql = `INSERT INTO Person SET ? `
            connection.query(sql,ins,function(error,results){
              if (err){
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
