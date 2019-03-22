const express 	 	= require('express');
const bodyParser 	= require('body-parser');
const path 			= require('path');
const session 		= require('express-session');
var logger 			= require('morgan');
var cookieParser 	= require('cookie-parser');

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

//muss hier noch angepasst werden egtl für jede Benutzerrolle eine eigene connection
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'abschlussarbeitendb'
});
connection.connect();





/*******************************************************************************
 * 								Fileupload
 ******************************************************************************/


//var mime = require('mime');
var multer = require('multer');
var patt = new RegExp("/.*.pdf.*/i");

var storage =   multer.diskStorage({
	//Ordner auswählen wo es drin gespeichert werden soll.
	destination: function (req, file, callback) {
	    callback(null, './uploads');
	  },

	  //FIlename orignal benutzen oder vielleicht anders abspeichern ?
	  filename: function (req, file, callback) {

		callback(null, file.originalname);

}


	});
	var upload = multer({
		storage : storage,
		fileFilter: function (req, file, cb) {
//			var x = mime.contentType(y.toString);

	//		console.log(x.toString());
			//prüfung ob filetyp pdf ist anhand des namens sonst über mimetype besser
			if (path.extname(file.originalname) !== '.pdf') {
			      return cb(new Error('Only pdfs are allowed'))
			    }
		     cb(null, true);
		   }
		}).single('myfile');

	app.get('/uploads',function(req,res){

		res.sendFile(__dirname + "/index.html");
	});


	app.post('/uploadjavatpoint',function(req,res){
	    upload(req,res,function(err) {
	    	if(err) {
	            return res.end("Error uploading file.");
	        }
	        res.end("File is uploaded successfully!");
	    });
	});


/*--------------------------------------------------------------------------------
 -------------------------------Login---------------------------------------------
 ---------------------------------------------------------------------------------*/

	const users = require('./models/users').method;


	app.route('/api/users')
	.get( function(req, res){

		var x = users(connection, function(error, results, fields)  {
			if(error) {
				res.status(500);
				res.send('Error in Database Connection or Query');
				} else {

					res.json(results)


				}
			var x = JSON.stringify(res);
			// hier vielleicht die Logik des anmeldens und der session implementieren.
			if (x.length >= 0){
				console.log(x)
				console.log("Eintrag gefunden")
			} else {
				console.log("eintrag nicht gefunden")
			}
		}).checkuser(req)
	})



function requireRole (role) {
	return function (req, res, next) {
	if (req.session.user && req.session.user.role === role) {
	next();
	} else {
	res.send(403);
	}
	}
	}


/* -------------------------------------------------------------
					Branche
-------------------------------------------------------------*/
app.route('/api/branche/getbyid')
    .get(function(req, res, next){
        branche(connection, function(error, results, fields)  {
            if(error) {
                res.status(500);
                res.send('Error in Database Connection or Query');
            } else {

                res.send(results);
            }
        }).getById(req)
    }
  )

 app.route('/api/branche/getAll')
 .get( function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
        // Lasse bitte einmal Prüfen ob du das objekt so wie es jetzt ankommt haben willst
        //wenn nicht dann probier mal bitte die auskommentierte Zeile unter res.send und kommentier die erste aus
        //var json =  JSON.parse(results);
        res.send(results);
        //res.send(json)
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
app.route('/api/branche/add')
.get(function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).add(req)
})



/* -------------------------------------------------------------
					adresse
-------------------------------------------------------------*/

const adress = require('./models/adresse').method;



app.route('/api/adresse/getbyid')
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
			console.log(error);
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
app.route('/api/adresse/add')
.get(function(req, res) {
	 adress(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).add(req)
})

/* -------------------------------------------------------------
					unternehmen
-------------------------------------------------------------*/
const company = require('./models/unternehmen').method;



app.route('/api/unternehmen/getbyid')
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

app.route('/api/unternehmen/add')
.get(function(req, res) {
	 company(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).add(req)
})


/* -------------------------------------------------------------
					abschlussarbeit
-------------------------------------------------------------*/
const abschluss = require('./models/abschlussarbeit').method;



app.route('/api/abschlussarbeit/getbyid')
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
		 console.log(results);
		 if(error) {
			console.log(error);
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

app.route('/api/abschlussarbeit/add')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		if(error) {
			console.log(error);
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).add(req)
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



app.route('/api/student/getbyid')
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
app.route('/api/student/add')
.get(function(req, res) {
	 student(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).add(req)
})

/* -------------------------------------------------------------
					person
-------------------------------------------------------------*/
const person = require('./models/person').method;



app.route('/api/person/getbyid')
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
			console.log(error)
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
app.route('/api/person/add')
.get(function(req, res) {
	 person(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).add(req)
})


/* -------------------------------------------------------------
					rechtsform
-------------------------------------------------------------*/
const rechtsform = require('./models/rechtsform').method;



app.route('/api/rechtsform/getbyid')
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
app.route('/api/rechtsform/add')
.get(function(req, res) {
	 rechtsform(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).add(req)
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



app.route('/api/kategorie/getbyid')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) {
			console.log(error);
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
app.route('/api/kategorie/add')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).add(req)
})
app.route('/api/kategorie/delete')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).delete(req)
})



/* -------------------------------------------------------------
					akademischergrad
-------------------------------------------------------------*/
const akgrad = require('./models/akademischergrad').method;



app.route('/api/akademischergrad/getbyid')
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
			console.log(error);
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


app.route('/api/akademischergrad/add')
.get(function(req, res) {
	 akgrad(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).add(req)
})

/* -------------------------------------------------------------
					Studiengang
-------------------------------------------------------------*/
const Studiengang = require('./models/Studiengang').method;



app.route('/api/Studiengang/getbyid')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			console.log(error);
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getById(req)
})

app.route('/api/Studiengang/getall')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getAll()
})

app.route('/api/Studiengang/create')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

app.route('/api/Studiengang/update')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).update(req)
})

app.route('/api/Studiengang/find')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).find(req)
})
app.route('/api/Studiengang/add')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).add(req)
})
app.route('/api/Studiengang/delete')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).delete(req)
})


/* -------------------------------------------------------------
					Betreuer
-------------------------------------------------------------*/
const betreuer = require('./models/Betreuer').method;



app.route('/api/Betreuer/getbyid')
.get(function(req, res) {
	 betreuer(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getById(req)
})

app.route('/api/Betreuer/getall')
.get(function(req, res) {
	 betreuer(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getAll()
})

app.route('/api/Betreuer/create')
.get(function(req, res) {
	 betreuer(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

app.route('/api/Betreuer/update')
.get(function(req, res) {
	 betreuer(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).update(req)
})

app.route('/api/Betreuer/find')
.get(function(req, res) {
	 betreuer(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).find(req)
})

app.route('/api/Betreuer/add')
.get(function(req, res) {
	 betreuer(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).add(req)
})

/* -------------------------------------------------------------
					person
-------------------------------------------------------------*/
const dozent = require('./models/dozent').method;



app.route('/api/dozent/getbyid')
.get(function(req, res) {
	 dozent(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getById(req)
})

app.route('/api/dozent/getall')
.get(function(req, res) {
	 dozent(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).getAll()
})

app.route('/api/dozent/create')
.get(function(req, res) {
	 dozent(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).create(req)
})

app.route('/api/dozent/update')
.get(function(req, res) {
	 dozent(connection, function(error, results, fields) {
		if(error) {
			console.log(error)
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).update(req)
})

app.route('/api/dozent/find')
.get(function(req, res) {
	 dozent(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).find(req)
})
app.route('/api/dozent/add')
.get(function(req, res) {
	 dozent(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send('Error in Database Connection or Query');
			} else {
				res.json(results)
				}}).add(req)
})



app.listen(8080, function(){
	console.log('Server Started on Port 8080...');
})
