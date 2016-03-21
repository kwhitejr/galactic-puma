var express =       require('express'),
    validator =     require('express-validator'),
    passport =      require('passport'),
    session =       require('express-session'),
    router =        express.Router(),
    db =            require('../models'),
    Roaster =       db.Roaster;


var flash = {};

router.route('/dashboard')
  .get(function(req, res) {
    console.log(req.session.passport);
    res.render('roaster-dashboard', { roaster: req.session.passport.user });
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
    res.render('register-roaster');
  })
  .post(function (req, res) {
    req.checkBody('username', 'Username is required.').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('roasterBusinessName', 'Business name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email does not appear to be valid').isEmail();

    var errors = req.validationErrors();
    if (errors) {
      flash = {type: 'alert-danger', messages: errors};
      res.render('register-roaster', { flash: flash });

    } else {
      console.log(req.body);
      var newRoaster = {
        roasterBusinessName: req.body.roasterBusinessName,
        street: req.body.street,
        state: req.body.state,
        zipCode: req.body.zipCode,
        webSite: req.body.webSite,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      };

      Roaster.create(newRoaster)
        .then(function (result) {
          flash.type = 'alert-success';
          flash.messages = [{ msg: 'Please check your email to verify your registration. Then you will be ready to log in!' }];
          res.render('login', { flash: flash });
        })
        .catch(function (errors) {
          flash = {type: 'alert-danger', messages: errors};
          res.render('register-roaster', { flash: flash });
        });
    }
  });

  router.route('/register-product')
    .get(function (req, res) {
      res.render('register-product', { roaster: req.session.passport.roaster });
    });

module.exports = router;