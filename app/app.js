//Sets up the whole app and requires all dependencies.
import "angular";
import "angular-route";
import "lodash";

var app = angular.module("quizme", [
  "ngRoute"
]);

require("./styles/styles.less");
require("./filters.js");
require("./main.controller.js");
require("./validationError.directive.js");
require("./quiz.service.js");
require("./take.controller.js");
require("./create-edit.controller.js");
require("./results.controller.js");

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/", {
    template: require("./main.html"),
    controller: "mainController as vm",
  }),
  $routeProvider.when("/create", {
    template: require("./create-edit.html"),
    controller: "createEditController as vm",
  }),
  $routeProvider.when("/edit/:quizId", {
    template: require("./create-edit.html"),
    controller: "createEditController as vm",
  }),
  $routeProvider.when("/take/:quizId", {
    template: require("./take.html"),
    controller: "takeController as vm",
  }),
    $routeProvider.when("/results/", {
    template: require("./results.html"),
    controller: "resultsController as vm",
  })
}]);

