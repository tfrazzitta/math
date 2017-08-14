var path = require("path");

module.exports=function(app){

app.get('/', function(req, res){
 res.render('index');
});


app.get("/eighth", function(req, res) {
	if(req.user==undefined){
		res.render('index')
	}
	else{
		res.sendFile(path.join(__dirname, "../public/html/eighth.html"));
	}
});


app.get("/sixth", function(req, res) {
	if(req.user==undefined){
		res.render('index')
	}
	else{
		res.sendFile(path.join(__dirname, "../public/html/sixth.html"));
	}
});

app.get("/seventh", function(req, res) {
	if(req.user==undefined){
		res.render('index')
	}
	else{
		res.sendFile(path.join(__dirname, "../public/html/seventh.html"));
	} 
});

app.get("/algebra", function(req, res) {
	if(req.user==undefined){
		res.render('index')
	}
	else{
		 res.sendFile(path.join(__dirname, "../public/html/algebra.html"));
	}
});

app.get("/home", function(req, res) {
		if(req.user==undefined){
		res.render('index')
	}
	else{
		 res.sendFile(path.join(__dirname, "../public/html/home.html"));
	}
});

app.get("/savedItems", function(req, res) {
		if(req.user==undefined){
		res.render('index')
	}
	else{
		 res.sendFile(path.join(__dirname, "../public/html/savedItems.html"));
	}
});




// app.get('/', ensureAuthenticated, function(req, res){
//  res.render('index');
// });


// function ensureAuthenticated(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	} else {
// 		//req.flash('error_msg','You are not logged in');
// 		res.redirect('/users/login');
// 	}
// }

}
/////END
