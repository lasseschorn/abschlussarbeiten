const express 	 	= require('express');
const bodyParser 	= require('body-parser');
const path 			= require('path');
const session 		= require('express-session');

const app = express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* -------------------------------------------------------------
					Entitäten
-------------------------------------------------------------*/
const branche = require('./models/branche').method;
/* -------------------------------------------------------------
					SQL Connection
-------------------------------------------------------------*/
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'abschlussarbeitdb'
});
connection.connect();
/* -------------------------------------------------------------
					Branche
-------------------------------------------------------------*/
app.route('/api/branche')
	//TEST REQUEST SQL
	/* .get( function(req, res){
            connection.query(`SELECT *
                        FROM branche 
						WHERE BranchenID = ${req.param('id').toString()} ;`, 
						function(error, results, fields) { res.json(results)} )

	}) 
	*/
.get( function(req, res){
	branche(connection, function(error, results, fields)  { 
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
	}}).getById(req) })
	/* Methoden zum umwandeln in ein bestimmtes Objekt:
	Object.assign(new Branche, res.json(results)); OR  Object.setPrototypeOf(res.json(results), Branche.prototype);
	*/
	
	
/* .get( function(req, res) {
	debugger
	 Branche(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results).getAll()
				}})
})
.post( function(req, res){
	res.send('Hallo')
})
 */


app.listen(8080, function(){
	console.log('Server Started on Port 8080...');
})


