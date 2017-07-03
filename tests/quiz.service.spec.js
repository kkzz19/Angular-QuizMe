/**
 * Test quiz service (which handles quiz CRUD).
 */

describe("quiz service unit tests", function() {

  var quizService;

  var testQuizzes = [{
    id: "1",
    name: "quiz1",
    questions: {
      text: "quiz1 question name",
      correctAnswerIndex: 0,
      answers: [{
        text: "quiz1 answer 1",
      }, {
        text: "quiz1 answer 2"
      }]
    }
  },
  {
    id: "2",
    name: "quiz2",
    questions: {
      text: "quiz2 question name",
      correctAnswerIndex: 1,
      answers: [{
        text: "quiz2 answer 1",
      }, {
        text: "quiz2 answer 2"
      }]
    }
  }];

  beforeEach(window.module("quizme", function($provide) {}));

  beforeEach(inject(function(_quizService_) {
    //Set the quiz service
    quizService = _quizService_;

    //Mock localStorage
    var store = {};
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
        store = {};
    });
  }));

  it("test get initial", function () {
    expect(quizService.getQuizzes()).toEqual([]);
  }); 

  it("test save and get", function () {
    quizService.saveQuizzes(testQuizzes);
    var quizzes = quizService.getQuizzes();
    expect(quizzes).toEqual(testQuizzes);
  });

  it("test get quiz", function() {
    quizService.saveQuizzes(testQuizzes);
    var quiz = quizService.getQuiz("1");
    expect(quiz).toEqual(testQuizzes[0]);
    quiz = quizService.getQuiz("bad-id"); //Getting non-existant quiz shouldn't cause an error.
    expect(quiz).toBeUndefined();
  });

  it("test create quiz", function() {
    quizService.createQuiz(testQuizzes[0]);
    var quizzes = quizService.getQuizzes();
    expect(quizzes[0]).toEqual(testQuizzes[0]);
    quizService.createQuiz(testQuizzes[1]);
    quizzes = quizService.getQuizzes();
    expect(quizzes[1]).toEqual(testQuizzes[1]);
  });

  it("test edit quiz", function() {
    var testCopy = angular.copy(testQuizzes);
    quizService.saveQuizzes(testCopy);
    
    var editedQuiz = {
      id: "1",
      name: "quiz1(edited)",
      questions: {
        text: "quiz1 question name(edited)",
        correctAnswerIndex: 1,
        answers: [{
          text: "quiz1 answer 1(edited)",
        }, {
          text: "quiz1 answer 2(edited)"
        }]
      }
    };

    quizService.editQuiz(editedQuiz);
    var quiz = quizService.getQuiz("1");
    expect(quiz).toEqual(editedQuiz);
    
  });

  it("test delete quiz", function() {
    quizService.saveQuizzes(testQuizzes);
    quizService.deleteQuiz("1");
    var quiz = quizService.getQuiz("1");
    expect(quiz).toBeUndefined();
    quiz = quizService.getQuiz("2");
    expect(quiz).toEqual(testQuizzes[1]);
    quizService.deleteQuiz("2");
    var quizzes = quizService.getQuizzes();
    expect(quizzes).toEqual([]);
  });

});