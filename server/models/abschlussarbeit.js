exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
            var sql  = `SELECT *
                        FROM abschlussarbeiten 
                        WHERE DozentID = ${req.param('id').toString()} ;`;
            connection.query(sql, callback);
        },
        getAll: () => {
        	var sql = `SELECT * 
            FROM abschlussarbeiten; `;
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
        	var sql = `UPDATE branche 
                        SET  Bezeichnung = ${req.param('bez').toString()}
                        WHERE BranchenID = ${req.param('id').toString()}`;
            connection.query(sql, callback);
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
