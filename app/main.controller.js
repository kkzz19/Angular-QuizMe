(function () {

  angular.module("quizme").controller("mainController", mainController);
  mainController.$inject = ["$scope", "quizService", "$routeParams", "$rootScope", "$location"];

  function mainController($scope, quizService, $routeParams, $rootScope, $location) {
    var vm = this;
    vm.message = $rootScope.message;  //If using ui-router, we can avoid this global variable via state-change parameters.

    vm.quizzes = quizService.getQuizzes();
    vm.editQuiz = editQuiz;
    vm.deleteQuiz = deleteQuiz;
    vm.newQuiz = newQuiz;

    function editQuiz(quiz) {
      $location.path("edit/" + quiz.id);
    }

    function deleteQuiz(quiz) {
      if(confirm("Are you sure you want to delete quiz \"" + quiz.name + "\"? This can't be undone.")) {
        quizService.deleteQuiz(quiz.id);
        refreshQuizzes();
      }
    }

    function newQuiz(quiz) {
      $location.path("create");
    }

    function refreshQuizzes() {
      vm.quizzes = quizService.getQuizzes();
    }

    var unregisterRefreshQuizList = $rootScope.$on("RefreshQuizList", function() {
      refreshQuizzes();
    });
    
    $scope.$on("$destroy", function() {
      unregisterRefreshQuizList();
    })

    $scope.$on("$destroy", function() {
      $rootScope.message = "";
    });

  }
})();