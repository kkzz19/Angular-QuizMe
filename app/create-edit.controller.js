(function () {

  angular.module("quizme").controller("createEditController", createEditController);
  createEditController.$inject = ["$scope", "quizService", "$routeParams", "$rootScope", "$location"];

  function createEditController($scope, quizService, $routeParams, $rootScope, $location) {
    var vm = this;
    var controllerTypes = {
      create: 0,
      edit: 1
    };
    var controllerType;
    
    if($routeParams.quizId) {
      vm.quiz = quizService.getQuiz($routeParams.quizId);
      controllerType = controllerTypes.edit;
      vm.header = "Edit Quiz";
    } 
    else {
      //Start user off with a quiz with 1 question with 2 answers
      vm.quiz = {
        questions: [{
          correctAnswerIndex: 0,
          answers: [{}, {}]
        }]
      };
      controllerType = controllerTypes.create;
      vm.header = "Create Quiz";
    }

    vm.removeAnswer = removeAnswer;
    vm.removeQuestion = removeQuestion;
    vm.addQuestion = addQuestion;
    vm.addAnswer = addAnswer;
    vm.saveQuiz = saveQuiz;
    vm.cancel = cancel;
    vm.validateQuiz = validateQuiz;

    function removeAnswer(question, index) {
      question.answers.splice(index, 1);
    }

    function removeQuestion(index) {
      vm.quiz.questions.splice(index, 1);
    }

    function addAnswer(question) {
      question.answers.push({});
    }

    function addQuestion() {
      if(!vm.quiz.questions) {
        vm.quiz.questions = [];
      }
      vm.quiz.questions.push({
        answers: [{}, {}],
        correctAnswerIndex: 0
      });
    }

    function validateQuiz() {

      vm.valQuizNameBlank = false;
      vm.valQuizNoQuestions = false;
      
      var isValid = true;
      if(!vm.quiz.name) {
        vm.valQuizNameBlank = true;
        isValid = false;
      }
      if(vm.quiz.questions.length === 0) {
        vm.valQuizNoQuestions = true;
        isValid = false;
      }
      for(var question of vm.quiz.questions) {

        question.valNoText = false;
        question.valNotEnoughAnswers = false;

        if(!question.text) {
          question.valNoText = true;
          isValid = false;
        }
        if(question.answers.length < 2) {
          question.valNotEnoughAnswers = true;
          isValid = false;
        }
        for(var answer of question.answers) { 

          answer.valAnswerBlank = false;

          if(!answer.text) {
            answer.valAnswerBlank = true;
            isValid = false;
          }
        }
      }
      return isValid;
    }

    function saveQuiz() {
      if(!validateQuiz()) {
        vm.errorMsg = "Quiz has errors, please view and correct them above."
        return;
      }
      if(!vm.submitted) {
        vm.submitted = true;
        if(controllerType === controllerTypes.create) {
          quizService.createQuiz(vm.quiz);
        } else if(controllerType === controllerTypes.edit) {
          quizService.editQuiz(vm.quiz);
        }
        $rootScope.message = "Quiz successfully saved.";
        $location.path("/");
      }
    }

    function cancel() {
      $location.path("/");
    }

  }

})();