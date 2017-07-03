angular.module("quizme").filter('numToLetter', function() {
  return function(input) {
    return String.fromCharCode(65 + input);
  }
});