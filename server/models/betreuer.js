exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var uUID = req.query['uUID'];
        	var uAAID = req.query['uAAID'];
            var sql  = `SELECT *
                        FROM betreuer
                        WHERE Unternehmen_UnternehmensID = ? and
                        Unternehmen_Adresse_AdressID = ?`
            connection.query(sql,[uUID,uAAID], function(error,results){
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
            FROM betreuer; `;
            connection.query(sql, function(error,results){
              if (err){
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
        			Unternehmen_UnternehmensID : req.query['uUID'],
        			Unternehmen_Adresse_AdressID : req.query['uAAID']

        	}

        	var pPID = req.query['pPID'];

        	var sql = `UPDATE Betreuer
                        SET  ?
                        WHERE Person_PersonenID = ?`;
            connection.query(sql,[ins,pPID], function(error,results){
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
        			Unternehmen_UnternehmensID: req.query['uUID'],
        			Unternehmen_Adresse_AdressID: req.query['uAAID'],
        			Person_PersonenID: req.query['pPID']
        	}

        	var sql = `INSERT INTO Betreuer SET ? `
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
