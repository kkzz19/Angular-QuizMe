(function () {

  angular.module("quizme").controller("resultsController", resultsController);
  resultsController.$inject = ["$scope", "quizService", "$routeParams", "$rootScope", "$location"];

  function resultsController($scope, quizService, $routeParams, $rootScope, $location) {
    var vm = this;
    vm.quiz = $rootScope.submittedQuiz;
    vm.isRight = isRight;
    vm.backToHome = backToHome;
    init();

    function init() {
      var numRight = 0;
      for(var question of vm.quiz.questions) {
        if(question.chosenAnswer === question.correctAnswerIndex) {
          numRight++;
        }
      }
      vm.score = String(Math.round(numRight * 100 / vm.quiz.questions.length)) + "% (" + String(numRight) + "/" + String(vm.quiz.questions.length) + " answers correct)";
    }

    function isRight(question) {
      return question.chosenAnswer === question.correctAnswerIndex;
    }

    function backToHome() {
      $location.path("/");
    }

    $scope.$on("$destroy", function() {
      $rootScope.submittedQuiz = null;
    });
  }

})();