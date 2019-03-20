exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var pID = req.query['pID'];
            var sql  = `SELECT *
                        FROM person
                        WHERE PersonenID = ?`
            connection.query(sql,pID, callback);
        },
        getAll: () => {
        	var sql = `SELECT *
            FROM person; `;
            connection.query(sql, callback);
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
            connection.query(sql,[ins,pID], callback);
        },
        add: (req) => {
        	const ins = {
        			Vorname: req.query['vname'],
        			Nachname: req.query['nname'],
        			Geschlecht: req.query['gs'],
        			'E-Mail': req.query['email']
        	}

        	var sql = `INSERT INTO Person SET ? `
            connection.query(sql,ins,callback);
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
