(function () {
  angular.module("quizme").factory("quizService", quizService);
  function quizService() {
    
    return {
      getQuizzes: getQuizzes,
      saveQuizzes: saveQuizzes,
      getQuiz: getQuiz,
      createQuiz: createQuiz,
      editQuiz: editQuiz,
      deleteQuiz: deleteQuiz
    };

    function getQuizzes() {
      var quizzes = [];
      var quizJSON = localStorage.getItem("quizzes");
      if(quizJSON) {
        quizzes = JSON.parse(quizJSON);
      }
      return quizzes;
    }

    function saveQuizzes(quizzes) {
      localStorage.setItem("quizzes", JSON.stringify(quizzes));
    }

    function getQuiz(quizId) {
      var quizzes = getQuizzes();
      return _.find(quizzes, { "id": quizId });
    }

    function createQuiz(quiz) {
      var quizzes = getQuizzes();
      var curIds = _.map(quizzes, function(quiz) { return Number(quiz.id); });
      var maxId = _.max(curIds);
      if(!maxId) maxId = 0;
      maxId++;
      quiz.id = String(maxId);
      quizzes.push(quiz);
      saveQuizzes(quizzes);
    }

    function editQuiz(quiz) {
      var quizzes = getQuizzes();
      for(var i = 0; i < quizzes.length; i++) {
        if(quizzes[i].id === quiz.id) {
          quizzes[i] = quiz;
        }
      }
      saveQuizzes(quizzes);
    }

    function deleteQuiz(quizId) {
      var quizzes = getQuizzes();
      _.remove(quizzes, { "id": quizId });
      saveQuizzes(quizzes);
    }

  }

})();