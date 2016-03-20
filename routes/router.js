var express =       require('express'),
    validator =     require('express-validator'),
    router =        express.Router(),
    db =            require('../models'),
    User =          db.User;


var flash = {};

// module.exports = function (req, res, next) {

//   index = function (req, res) {
//     res.render('index');
//   };

//   login = function (req, res) {
//     res.render('login');
//   };

//   register = function (req, res) {
//     res.render('register');
//   };

//   dashboard = function(req, res) {
//     res.render('dashboard', { user: req.session.user });
//   };

//   logout = function(req, res) {
//     res.render('login');
//   };

//   registerUser = function (req, res) {

//     // Validate inputs
//     req.checkBody('username', 'Username is required.').notEmpty();
//     req.checkBody('password', 'Password is required').notEmpty();
//     req.checkBody('display', 'DisplayName is required').notEmpty();
//     req.checkBody('email', 'Email is required').notEmpty();
//     req.checkBody('email', 'Email does not appear to be valid').isEmail();

//     // Check validation for errors
//     var errors = req.validationErrors();

//     if (errors) {
//       flash = {type: 'alert-danger', messages: errors};
//       res.send(errors);

//     } else {

//       // Pull form data and add newUser to database
//       var newUser = {
//         username: req.body.username,
//         password: req.body.password,
//         displayName: req.body.display,
//         email: req.body.email
//       };

//       flash.type = 'alert-success';
//       flash.messages = [{ msg: 'Please check your email to verify your registration. Then you will be ready to log in!' }];
//       res.render('login', { flash: flash });
//     }
//   };

//   return next();
// };



router.route('/')
  .get(function(req, res) {
    res.redirect('index');
  });

router.route('/login')
  .get(function(req, res) {
    res.render('login');
  });

router.route('/register')
  .get(function (req, res) {
    res.render('register');
  })
  .post(function (req, res) {
    req.checkBody('username', 'Username is required.').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('display', 'DisplayName is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email does not appear to be valid').isEmail();

    var errors = req.validationErrors();
    if (errors) {
      flash = {type: 'alert-danger', messages: errors};
      res.render('register', { flash: flash });

    } else {
      var newUser = {
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.display,
        email: req.body.email
      };

      User.create(newUser)
        .then(function (result) {
          flash.type = 'alert-success';
          flash.messages = [{ msg: 'Please check your email to verify your registration. Then you will be ready to log in!' }];
          res.render('login', { flash: flash });
        })
        .catch(function (errors) {
          flash = {type: 'alert-danger', messages: errors};
          res.redirect('register', { flash: flash });
        });
    }
  });

router.route('/dashboard')
  .get(function(req, res) {
    res.render('dashboard');
  });

module.exports = router;