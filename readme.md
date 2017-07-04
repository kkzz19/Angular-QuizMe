# Application Info

* A sample AngularJS web application for creating and taking your own quizzes.
* Currently all quizzes are saved to localStorage. A backend may be added soon.

# Running the application:

* Install NPM if not already.
* Build dependencies: run "npm i" in this directory. This only needs to be done once or if the dependencies in package.json change.
* Run "npm start" in this directory to start the application, and navigate to localhost:3000 to view
* Run "npm run build" in this directory to build the site to the "docs" folder. (Note: we are building to github pages, so we use "docs" instead of "dist" and we specify "Angular-QuizMe" as the public path in webpack.config.js.)
* Run "npm run start-prod" in this directory to run the built site from the command above.
* Run "npm test" and navigate to http://localhost:9876/ to run the unit tests.

License: MIT