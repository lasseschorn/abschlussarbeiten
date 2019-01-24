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
	/* Methoden zum umwandeln in ein bestimmtes Objekt:
	Object.assign(new Branche, res.json(results)); OR  Object.setPrototypeOf(res.json(results), Branche.prototype);
	*/	
	
/*.post( function(req, res){
	res.send('Hallo')
})
 */
app.route('/api/branche')
.get( function(req, res){
	branche(connection, function(error, results, fields)  { 
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
	}}).getById(req) })

 app.route('/api/branche/getAll')
 .get( function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getAll()
})

app.route('/api/branche/delete')
 .get( function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).delete(req)
})
		
app.route('/api/branche/update')
 .get( function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).update(req)
})


app.route('/api/branche/find')
.get(function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).find(req)
})

app.route('/api/branche/create')
.get(function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

/* -------------------------------------------------------------
					adresse
-------------------------------------------------------------*/

const adress = require('./models/adresse').method;



app.route('/api/adresse/')
.get(function(req, res) {
	 adress(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getById(req)
})

app.route('/api/adresse/getall')
.get(function(req, res) {
	 adress(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getAll()
})

app.route('/api/adresse/create')
.get(function(req, res) {
	 adress(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

app.route('/api/adresse/update')
.get(function(req, res) {
	 adress(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).update(req)
})

app.route('/api/adresse/find')
.get(function(req, res) {
	 adress(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).find(req)
})


/* -------------------------------------------------------------
					unternehmen
-------------------------------------------------------------*/
const company = require('./models/unternehmen').method;



app.route('/api/unternehmen/')
.get(function(req, res) {
	 company(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getById(req)
})

app.route('/api/unternehmen/getall')
.get(function(req, res) {
	 company(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getAll()
})

app.route('/api/unternehmen/create')
.get(function(req, res) {
	 company(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

app.route('/api/unternehmen/update')
.get(function(req, res) {
	 company(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).update(req)
})

app.route('/api/unternehmen/find')
.get(function(req, res) {
	 company(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).find(req)
})

/* -------------------------------------------------------------
					abschlussarbeit
-------------------------------------------------------------*/
const abschluss = require('./models/abschlussarbeit').method;



app.route('/api/abschlussarbeit/')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getById(req)
})

app.route('/api/abschlussarbeit/getall')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getAll()
})

app.route('/api/abschlussarbeit/create')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

app.route('/api/abschlussarbeit/update')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).update(req)
})

app.route('/api/abschlussarbeit/find')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).find(req)
})

/* -------------------------------------------------------------
					student
-------------------------------------------------------------*/
const student = require('./models/student').method;



app.route('/api/student/')
.get(function(req, res) {
	 student(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getById(req)
})

app.route('/api/student/getall')
.get(function(req, res) {
	 student(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getAll()
})

app.route('/api/student/create')
.get(function(req, res) {
	 student(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

app.route('/api/student/update')
.get(function(req, res) {
	 student(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).update(req)
})

app.route('/api/student/find')
.get(function(req, res) {
	 student(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).find(req)
})


/* -------------------------------------------------------------
					person
-------------------------------------------------------------*/
const person = require('./models/person').method;



app.route('/api/person/')
.get(function(req, res) {
	 person(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getById(req)
})

app.route('/api/person/getall')
.get(function(req, res) {
	 person(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getAll()
})

app.route('/api/person/create')
.get(function(req, res) {
	 person(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

app.route('/api/person/update')
.get(function(req, res) {
	 person(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).update(req)
})

app.route('/api/person/find')
.get(function(req, res) {
	 person(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).find(req)
})

/* -------------------------------------------------------------
					rechtsform
-------------------------------------------------------------*/
const rechtsform = require('./models/rechtsform').method;



app.route('/api/rechtsform/')
.get(function(req, res) {
	 rechtsform(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getById(req)
})

app.route('/api/rechtsform/getall')
.get(function(req, res) {
	 rechtsform(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getAll()
})

app.route('/api/rechtsform/create')
.get(function(req, res) {
	 rechtsform(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

app.route('/api/rechtsform/update')
.get(function(req, res) {
	 rechtsform(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).update(req)
})

app.route('/api/rechtsform/find')
.get(function(req, res) {
	 rechtsform(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).find(req)
})


/* -------------------------------------------------------------
					kategorie
-------------------------------------------------------------*/
const kategorie = require('./models/kategorie').method;



app.route('/api/kategorie/')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getById(req)
})

app.route('/api/kategorie/getall')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getAll()
})

app.route('/api/kategorie/create')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

app.route('/api/kategorie/update')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).update(req)
})

app.route('/api/kategorie/find')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).find(req)
})

/* -------------------------------------------------------------
					akademischergrad
-------------------------------------------------------------*/
const akgrad = require('./models/akademischergrad').method;



app.route('/api/akademischergrad/')
.get(function(req, res) {
	 akgrad(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getById(req)
})

app.route('/api/akademischergrad/getall')
.get(function(req, res) {
	 akgrad(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getAll()
})

app.route('/api/akademischergrad/create')
.get(function(req, res) {
	 akgrad(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

app.route('/api/akademischergrad/update')
.get(function(req, res) {
	 akgrad(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).update(req)
})

app.route('/api/akademischergrad/find')
.get(function(req, res) {
	 akgrad(connection, function(error, results, fields) {
		if(error) { 
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).find(req)
})


app.listen(8080, function(){
	console.log('Server Started on Port 8080...');
})


