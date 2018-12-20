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
            var sql = `SELECT * 
            FORM branche `;
            connection.query(sql, callback);
        },
        delete: (id) => {
            var sql = `DELETE  
                        FORM branche 
                        WHERE BranchenID = ${id} `;
            connection.query(sql, callback);
        },
        update: (id, bez) => {
            var sql = `UPDATE branche 
                        SET  Bezeichnung = ${bez}
                        WHERE BranchenID = ${id}`;
            connection.query(sql, callback);
        },
        find: (bez) => {
            var sql = `SELECT * 
                        FORM branche 
                        WHERE Bezeichnung = ? ${bez} ?`;
            connection.query(sql, callback);
        },
        create: (bez) => {
            var sql = `SELECT * 
                        FORM branche 
                        WHERE Bezeichnung = ? ${bez} ?`;
            connection.query(sql, callback);
        }
    };
}
