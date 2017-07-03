(function () {

  angular.module("quizme").directive("validationError", validationError);
  function validationError() {
    return {
      template: '<span><span class="glyphicon glyphicon-warning-sign error-color"></span><span class="error-color">&nbsp;{{ msg }}</span></span>',
      scope: {
        msg: "@"
      }
    }
  }
})();
  
