exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
            var sql  = `SELECT *
                        FROM branche 
                        WHERE BranchenID = ${req.param('id').toString()} ;`;
            connection.query(sql, callback);
        },
        getAll: () => {
        	console.log("getAll-branche")
            var sql = `SELECT * 
            FROM branche; `;
//            connection.query("SELECT * FROM branche", function (err, result, fields) {
//                if (err) throw err;
//                console.log(result);
//              });
            connection.query(sql, callback);
        },
        delete: (req) => {
        	console.log("getDelete");
            var sql = `DELETE  
                        FROM branche 
                        WHERE BranchenID = ${req.param('id').toString()}; `;
        	console.log(sql);
            connection.query(sql, callback);
        },
        update: (req) => {
        	console.log("update")
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
