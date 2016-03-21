var express =       require('express'),
    validator =     require('express-validator'),
    passport =      require('passport'),
    session =       require('express-session'),
    router =        express.Router(),
    db =            require('../models'),
    User =          db.User;


var flash = {};

router.route('/dashboard')
  .get(function(req, res) {
    console.log(req.session.passport);
    res.render('dashboard', { user: req.session.passport.user });
  });

router.route('/login')
  .get(function(req, res) {
    res.render('login');
  })
  .post(
    function (req, res, next) {
      console.log(req.body.dataValues);
      next();
    },
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login'
    })
  );

router.route('logout')
  .get(function (req, res) {
    req.logout();
    res.redirect('login');
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
          res.render('register', { flash: flash });
        });
    }
  });

router.route('/dashboard')
  .get(function(req, res) {
    res.render('dashboard');
  });

module.exports = router;