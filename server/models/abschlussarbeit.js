exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var sql  = `SELECT *
                        FROM abschlussarbeit 
                        WHERE DozentID = ?`;
        	
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
        	
        	//was ist mit den anderen daten die in anderen tabellen abgelegt sind 
        	//vorher  holen und dann eintragen oder wie?
        	var abstract = req.query['abstract'];
        	var titel = req.query['titel'];
        	var beschreibung = req.query['beschreibung'];
        	//noch eintragen weiss nicht gerade wie dateformat aussehen soll
        	var datum = req.query['date'];
        	var id = req.query['id'];
        	
        	var sql = `UPDATE abschlussarbeit 
                        SET  Abstract = `+ abstract +`, Titel = `+ titel + `, Beschreibung`+ beschreibung + `
                        WHERE Dozent_DozentID = ?`;
            connection.query(sql,id, callback);
        },
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
