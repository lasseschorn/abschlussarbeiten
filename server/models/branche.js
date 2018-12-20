exports.method =
function(connection, callback) {
    return {
        getBranche: (req) => {
            var sql  = `SELECT *
                        FROM branche 
                        WHERE BranchenID = ${req.param('id').toString()} ;`;
            connection.query(sql, callback);
        },
        getAllBranche: () => {
            var sql = `SELECT * 
            FORM branche `;
            connection.query(sql, callback);
        },
        deleteBranche: (id) => {
            var sql = `DELETE  
                        FORM branche 
                        WHERE BranchenID = ${id} `;
            connection.query(sql, callback);
        },
        updateBranche: (id, bez) => {
            var sql = `UPDATE branche 
                        SET  Bezeichnung = ${bez}
                        WHERE BranchenID = ${id}`;
            connection.query(sql, callback);
        },
        findBrancheByBez: (bez) => {
            var sql = `SELECT * 
                        FORM branche 
                        WHERE Bezeichnung = ? ${bez} ?`;
            connection.query(sql, callback);
        }
    };
}
