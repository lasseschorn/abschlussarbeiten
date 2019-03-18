exports.method =
function(connection, callback) {
    return {
        getById: (req) => {
        	//richtige variable eintagen
        	var sID = req.query['sID'];
            var sql  = `select * 
            from Studiengang
            where StudiengangID = ? `
            connection.query(sql,sID, callback);
        },
        getAll: () => {
        	var sql = `SELECT * 
            FROM Studiengang; `;
            connection.query(sql, callback);
        },
        delete: (req) => {
        	var sID = req.query['sID'];
        	var sql = `DELETE  
                        FROM Studiengang
                        WHERE StudiengangID = ?`;
        	console.log(sql);
            connection.query(sql,sID, callback);
        },
        update: (req) => {
        	var bez = req.query['bez'];
        	var sID = req.query['sID'];
        	var sql = `UPDATE Studiengang
                        SET  Bezeichnung = ?
                        WHERE StudiengangID = ?`;
            connection.query(sql,[bez, sID] ,callback);
        },
        
        add: (req) => {
        	const ins = {
        			Bezeichnung: req.query['bez']
        	}
        	var sql = `INSERT INTO Studiengang SET ? `
            connection.query(sql,ins,callback);
        	
        },
        
        
        
        find: (req) => {
            var sql = `SELECT * 
                        FROM branche 
                        WHERE Bezeichnung like ${req.param('bez').toString()}`;
            connection.query(sql, callback);
        },
        
        
        create: (req) => {
            var sql = `CREATE TABLE IF NOT EXISTS AbschlussarbeitenDB.Studiengang (
            StudiengangID INT NOT NULL AUTO_INCREMENT,
            Bezeichnung VARCHAR(45) NOT NULL,
            PRIMARY KEY (StudiengangID))
            ENGINE = InnoDB;`;
            connection.query(sql, callback);
        }
    };
}
