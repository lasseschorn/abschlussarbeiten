exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	var pPID = req.query['pPID'];
            var sql  = `SELECT *
                        FROM dozent
                        WHERE Person_PersonenID = ? ;`;
            connection.query(sql,pPid, callback);
        },
        getAll: () => {
        	var sql = `SELECT *
            FROM dozent; `;
            connection.query(sql, callback);
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
            connection.query(sql,[ins,pPid], callback);
        },
        add: (req) => {
        	const ins = {
        			'Akademischer Grad_GradID': req.query['aGGID'],
        			Person_PersonenID:req.query['pPID']
        	}
        	var sql = `INSERT INTO dozent SET ? `
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
