$(function() {

  var password = $('#password');
  var confirmPassword = $('#confirm-password');
  var email = $('#email');
  var confirmEmail = $('#confirm-email');

  $("#register-form").kendoValidator({
    rules: {
      passwordMatch: function(input) {

        // passwords must match
        if (input.is('#confirm-password')) {
          return $.trim(password.val()) === $.trim(confirmPassword.val());
        }
        return true;
      },

      emailMatch: function(input) {
        // email addresses must match
        if (input.is('#confirm-email')) {
          return $.trim(email.val()) === $.trim(confirmEmail.val());
        }
        return true;

      }
    },
    messages: {

      // custom error messages. email gets picked up
      // automatically for any inputs of that type
      passwordMatch: 'The passwords don\'t match',
      emailMatch: 'The email addresses don\'t match',
      email: 'That doesn\'t appear to be a valid email address'
    }

  }).data('kendoValidator');

});