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
//app.use(cookieParser);
app.use(session({
    key: 'user_sid',
    secret: 'SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

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

//Hier ist die seite wo man weiter geleitet wird .
	app.post('/uploadjavatpoint',function(req,res){
	    upload(req,res,function(err) {
	    	if(err) {
	            return res.end("Error uploading file.");
	        }
	        res.end("File is uploaded successfully!");
	    });
	});






//
//              file searcher
//

  function getAllPDFinDir() {
    var walk    = require('walk');
    var files   = [];

    // Walker options
    var walker  = walk.walk('./uploads', { followLinks: false });

    walker.on('file', function(root, stat, next) {
        // Add this file to the list of files
        files.push(root + '/' + stat.name);
        next();
    });

    walker.on('end', function() {
        console.log(files);
    });
    return files;
  }

  app.route('/api/uploads/show')
      .get(function(req,res,next){
        getAllPDFinDir()
      })





/*--------------------------------------------------------------------------------
 -------------------------------Login---------------------------------------------
 ---------------------------------------------------------------------------------*/
 //******************************* */
 //******************************* */
 // /api/login/logout Methode GET
 //session auslesen
 // retrun json
 //sussess: boolean;

 //******************* */
 // PHP Style
 //<?php
 //session_start();
 //unset($_SESSION);
 //session_destroy();
 //?>
 //{
 //    "success": true
 //}


 //******************************* */
 //******************************* */
 // /api/login/isloggedin  Methode GET
 //session auslesen
 //  retrun json
 //status: boolean;

 //******************* */
 // PHP Style
 //<?php
 //session_start();
 //if(isset($_SESSION['user'])) {
 //    echo '{"status": true}';
 //} else {
 //    echo '{"status": false}';
 //}
 //?>


 //******************************* */
 //******************************* */
 ///api/login/userdetails Methode POST
 // return json
 // success: boolean;
 // message: string;

 //******************* */
 //PHP Style
 //<?php
 //session_start();
 //$_POST = json_decode(file_get_contents('php://input'), true);
 //if(isset($_POST) && !empty($_POST)) {
 //    $username = $_POST['username'];
 //    $password = $_POST['password'];
 //    if($username == 'admin' && $password == 'admin') {
 //        $_SESSION['user'] = 'admin';
 //        ?>
 //{
 //  "success": true,
 //  "secret": "This is the secret no one knows but the admin"
 //}
 //    <?php
 //  } else {
 //    ?>
 //{
 //  "success": false,
 //  "message": "Invalid credentials"
 //}
 //    <?php
 //  }
 //} else {
   //var_dump($_POST)
 //  ?>
 //{
 //  "success": false,
 //  "message": "Only POST access accepted"
 //}
 //  <?php
 //}
 //?>


	const users = require('./models/users').method;

  function check_auth(req, res, next) {
    if(!req.session.user){
      res.send(JSON.stringify({status:false,message:"Nicht eingeloggt keine berechtigung auf Server ebene."}));
      return;
    }
    next();
  }


    app.route('/api/login/isloggedin')
        .get(function(req, res, next){
          if(!req.session.user){
            res.send(JSON.stringify({status:false}))
          } else {
            res.send(JSON.stringify({status:true}))
          }
        }
      )

  app.route('/api/login')
      .post(function(req, res, next){
          users(connection, function(error, results, fields)  {
              if(error) {
                  res.status(500);
                  if (error.message == "Falsche Zugangsdaten."){
                    res.send(JSON.stringify({success:false,message:"Falsche Zugangsdaten"}));

                  } else {
                    res.send(JSON.stringify({sucess:false,message:"etwas ist schief gelaufen"}))
                  }
              } else {
                req.session.user = results;
                res.send(JSON.stringify({success:true,message:"Alles in ordnung."}));                      }
          }).checkuser(req)
      }
    )

      app.route('/api/login/userdetails')
          .post(function(req, res, next){
              users(connection, function(error, results, fields)  {
                  if(error) {
                      res.status(500);
                      if (error.message == "Falsche Zugangsdaten."){
                        res.send(JSON.stringify({success:false,message:"Falsche Zugangsdaten"}));

                      } else {
                        res.send(JSON.stringify({sucess:false,message:"etwas ist schief gelaufen"}))
                      }
                  } else {
                        if (results == "Admin"){
                            req.session.user = fields;
                            req.session.login = results;
                            res.send(JSON.stringify({success:true,message:"This is the secret no one knows but the admin"}));
                        } else {
                            res.send(JSON.stringify({sucess:false,message:"Invalid credentials"}))
                        }
                    }

              }).getUserDetails(req)
          }
        )

  app.route('/api/login/logout')
      .get(function(req,res,next){
        req.session.destroy();
        res.send(JSON.stringify({success:true}))
      })


  app.route('/api/signup')
      .post(function(req,res,next){
        users(connection, function(error,results,fields){

        }).add(req)
      })




/* -------------------------------------------------------------
					Branche
-------------------------------------------------------------*/
app.route('/api/branche/getbyid')
    .get(check_auth,function(req, res, next){
        branche(connection, function(error, results, fields)  {
            if(error) {
                res.status(500);

                //Hier bitte gucken ob error objekt zurück kommen soll oder message
                res.send(error);
            } else {
                    res.send(results);
            }
        }).getById(req)
    }
  )

 app.route('/api/branche/getAll')
 .get(check_auth, function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send(error);
			} else {
          res.send(results);
        }}).getAll()
})

app.route('/api/branche/delete')
 .get( function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) {
      res.status(500);
			res.send(error);
			} else {
				res.send(results)
				}}).delete(req)
})

app.route('/api/branche/update')
 .get( function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send(error);
			} else {

				res.send(results)
      }}).update(req)
})


app.route('/api/branche/find')
.get(function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send(error);
			} else {
				res.send(results)
				}}).find(req)
})

app.route('/api/branche/create')
.get(function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).create(req)
})
app.route('/api/branche/add')
.get(function(req, res) {
	 branche(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
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
			res.send(error);
			} else {
				res.send(results)
				}}).getById(req)
})

app.route('/api/adresse/getall')
.get(function(req, res) {
	 adress(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send(error);
			} else {
				res.send(results)
				}}).getAll()
})

app.route('/api/adresse/create')
.get(function(req, res) {
	 adress(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).create(req)
})

app.route('/api/adresse/update')
.get(function(req, res) {
	 adress(connection, function(error, results, fields) {
		if(error) {
			res.send(error);
			} else {
				res.send(results)
				}}).update(req)
})

app.route('/api/adresse/find')
.get(function(req, res) {
	 adress(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).find(req)
})
app.route('/api/adresse/add')
.get(function(req, res) {
	 adress(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
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
		res.send(error);
			} else {
				res.send(results)
				}}).getById(req)
})

app.route('/api/unternehmen/getall')
.get(function(req, res) {
	 company(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).getAll()
})

app.route('/api/unternehmen/create')
.get(function(req, res) {
	 company(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).create(req)
})

app.route('/api/unternehmen/update')
.get(function(req, res) {
	 company(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).update(req)
})

app.route('/api/unternehmen/find')
.get(function(req, res) {
	 company(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).find(req)
})

app.route('/api/unternehmen/add')
.get(function(req, res) {
	 company(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
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
		res.send(error);
			} else {
				res.send(results)
				}}).getById(req)
})

app.route('/api/abschlussarbeit/getall')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).getAll()
})

app.route('/api/abschlussarbeit/create')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		 if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).create(req)
})

app.route('/api/abschlussarbeit/add')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).add(req)
})



app.route('/api/abschlussarbeit/update')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).update(req)
})

app.route('/api/abschlussarbeit/findByKategorie')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).findByKategorie(req)
})

app.route('/api/abschlussarbeit/findByStudiengang')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
      }}).findByStudiengang(req)
})

app.route('/api/abschlussarbeit/findByKategorieAndStudiengang')
.get(function(req, res) {
	 abschluss(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
      }}).findByKategorieAndStudiengang(req)
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
		res.send(error);
			} else {
				res.send(results)
				}}).getById(req)
})

app.route('/api/student/getall')
.get(function(req, res) {
	 student(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).getAll()
})

app.route('/api/student/create')
.get(function(req, res) {
	 student(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).create(req)
})

app.route('/api/student/update')
.get(function(req, res) {
	 student(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).update(req)
})

app.route('/api/student/find')
.get(function(req, res) {
	 student(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).find(req)
})
app.route('/api/student/add')
.get(function(req, res) {
	 student(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
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
		res.send(error);
			} else {
				res.send(results)
				}}).getById(req)
})

app.route('/api/person/getall')
.get(function(req, res) {
	 person(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).getAll()
})

app.route('/api/person/create')
.get(function(req, res) {
	 person(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).create(req)
})

app.route('/api/person/update')
.get(function(req, res) {
	 person(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).update(req)
})

app.route('/api/person/find')
.get(function(req, res) {
	 person(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).find(req)
})
app.route('/api/person/add')
.get(function(req, res) {
	 person(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
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
		res.send(error);
			} else {
				res.send(results)
				}}).getById(req)
})

app.route('/api/rechtsform/getall')
.get(function(req, res) {
	 rechtsform(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).getAll()
})

app.route('/api/rechtsform/create')
.get(function(req, res) {
	 rechtsform(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).create(req)
})

app.route('/api/rechtsform/update')
.get(function(req, res) {
	 rechtsform(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).update(req)
})
app.route('/api/rechtsform/add')
.get(function(req, res) {
	 rechtsform(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).add(req)
})


app.route('/api/rechtsform/find')
.get(function(req, res) {
	 rechtsform(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
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
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).getById(req)
})

app.route('/api/kategorie/getall')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).getAll()
})

app.route('/api/kategorie/create')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).create(req)
})

app.route('/api/kategorie/update')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).update(req)
})

app.route('/api/kategorie/find')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).find(req)
})
app.route('/api/kategorie/add')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).add(req)
})
app.route('/api/kategorie/delete')
.get(function(req, res) {
	 kategorie(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
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
			res.send(error);
			} else {
				res.send(results)
				}}).getById(req)
})

app.route('/api/akademischergrad/getall')
.get(function(req, res) {
	 akgrad(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send(error);
			} else {
				res.send(results)
				}}).getAll()
})

app.route('/api/akademischergrad/create')
.get(function(req, res) {
	 akgrad(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).create(req)
})

app.route('/api/akademischergrad/update')
.get(function(req, res) {
	 akgrad(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
			res.send(error);
			} else {
				res.send(results)
				}}).update(req)
})

app.route('/api/akademischergrad/find')
.get(function(req, res) {
	 akgrad(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).find(req)
})


app.route('/api/akademischergrad/add')
.get(function(req, res) {
	 akgrad(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
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
		res.send(error);
			} else {
				res.send(results)
				}}).getById(req)
})

app.route('/api/Studiengang/getall')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).getAll()
})

app.route('/api/Studiengang/create')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).create(req)
})

app.route('/api/Studiengang/update')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).update(req)
})

app.route('/api/Studiengang/find')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).find(req)
})
app.route('/api/Studiengang/add')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).add(req)
})
app.route('/api/Studiengang/delete')
.get(function(req, res) {
	 Studiengang(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
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
		res.send(error);
			} else {
				res.send(results)
				}}).getById(req)
})

app.route('/api/Betreuer/getall')
.get(function(req, res) {
	 betreuer(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).getAll()
})

app.route('/api/Betreuer/create')
.get(function(req, res) {
	 betreuer(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).create(req)
})

app.route('/api/Betreuer/update')
.get(function(req, res) {
	 betreuer(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).update(req)
})

app.route('/api/Betreuer/find')
.get(function(req, res) {
	 betreuer(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).find(req)
})

app.route('/api/Betreuer/add')
.get(function(req, res) {
	 betreuer(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
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
		res.send(error);
			} else {
				res.send(results)
				}}).getById(req)
})

app.route('/api/dozent/getall')
.get(function(req, res) {
	 dozent(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).getAll()
})

app.route('/api/dozent/create')
.get(function(req, res) {
	 dozent(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).create(req)
})

app.route('/api/dozent/update')
.get(function(req, res) {
	 dozent(connection, function(error, results, fields) {
		if(error) {
	res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).update(req)
})

app.route('/api/dozent/find')
.get(function(req, res) {
	 dozent(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).find(req)
})
app.route('/api/dozent/add')
.get(function(req, res) {
	 dozent(connection, function(error, results, fields) {
		if(error) {
			res.status(500);
		res.send(error);
			} else {
				res.send(results)
				}}).add(req)
})



app.listen(8080, function(){
	console.log('Server Started on Port 8080...');
})
