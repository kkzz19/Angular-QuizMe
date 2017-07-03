//Sets up the whole app and requires all dependencies.
import "angular";
import "angular-route";
import "lodash";

var app = angular.module("quizme", [
  "ngRoute"
]);

require("./../styles.less");
require("./filters.js");
require("./main.controller.js");
require("./validationError.directive.js");
require("./quiz.service.js");
require("./take.controller.js");
require("./create-edit.controller.js");
require("./results.controller.js");

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "app/main.html",
    controller: "mainController as vm",
  }),
  $routeProvider.when("/create", {
    templateUrl: "app/create-edit.html",
    controller: "createEditController as vm",
  }),
  $routeProvider.when("/edit/:quizId", {
    templateUrl: "app/create-edit.html",
    controller: "createEditController as vm",
  }),
  $routeProvider.when("/take/:quizId", {
    templateUrl: "app/take.html",
    controller: "takeController as vm",
  }),
    $routeProvider.when("/results/", {
    templateUrl: "app/results.html",
    controller: "resultsController as vm",
  })
}]);

