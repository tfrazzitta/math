
function myRoutes(app, passport) {

  app.get('/user', function(req, res) {
    console.log(req.user)
    var loggedIn = false;
      if (req.user) {
        loggedIn = true;
        console.log("logged IN")
        res.send(loggedIn); 
      } 
      else {
        res.send(loggedIn);
        console.log("logged OUT")
      }
  });

    // app.get('/unlink/google', function(req, res) {
    //         var user          = req.user;
    //         user.google.token = undefined;
    //         user.save(function(err) {
    //         //res.redirect('/home');
    //         });
    //     });

  app.get('/logout', function (req, res){
    req.session.destroy(function (err) {
    res.render('signOut');
    });
  });

// GOOGLE ROUTES =======================
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
// the callback after google has authenticated the user
app.get('/auth/google/callback',passport.authenticate('google', {successRedirect : '/',failureRedirect : '/'}));

// LOGOUT ==============================
// =====================================
//         app.get('/unlink/google', function(req, res) {
//             var user          = req.user;
//             user.google.token = undefined;
//             user.save(function(err) {
//                res.redirect('/profile');
//             });
//         });

//  route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {

//     if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//     return next();

//     if they aren't redirect them to the home page
//     res.redirect('/');
// }


};

module.exports = myRoutes;
