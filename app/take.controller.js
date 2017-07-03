(function () {

  angular.module("quizme").controller("takeController", takeController);
  takeController.$inject = ["$scope", "quizService", "$routeParams", "$rootScope", "$location"];

  function takeController($scope, quizService, $routeParams, $rootScope, $location) {
    var vm = this;

    vm.quiz = quizService.getQuiz($routeParams.quizId);
    vm.currentQuestionIndex = 0;

    vm.previousQuestion = previousQuestion;
    vm.nextQuestion = nextQuestion;
    vm.submit = submit;
    vm.unansweredQuestions = unansweredQuestions;

    init();

    function init() {
      for(var question of vm.quiz.questions) {
        question.chosenAnswer = -1;
      }
      vm.question = vm.quiz.questions[0];
    }

    function previousQuestion() {
      vm.currentQuestionIndex--;
      vm.question = vm.quiz.questions[vm.currentQuestionIndex];
    }

    function nextQuestion() {
      vm.currentQuestionIndex++;
      vm.question = vm.quiz.questions[vm.currentQuestionIndex];
    }

    function unansweredQuestions() {
      return _.some(vm.quiz.questions, function(question) {
        return question.chosenAnswer === -1;
      });
    }

    function submit() {
      $rootScope.submittedQuiz = vm.quiz;
      $location.path("/results");
    }


  }
})();