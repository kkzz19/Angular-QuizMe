require("./app/app.js");
require("angular-mocks");
var context = require.context("./tests", true, /\.spec\.js/);
context.keys().forEach(context);