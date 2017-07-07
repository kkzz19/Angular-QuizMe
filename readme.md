# Application info

* A sample AngularJS web application for creating and taking your own quizzes.
* Currently all quizzes are saved to localStorage. A backend may be added soon.

# Tools used
* This project uses a lot of technologies to create a streamlined build ecosystem and code architecture. The following are included:
    * NPM for package management
    * Webpack for bundling
    * AngularJS for the framework
    * LESS for CSS preprocessor
    * Babel for ES6 transpiling
    * Jasmine/karma for testing
    * A bunch of third party libraries, i.e. bootstrap, lodash, jquery, etc.

# Running the application:

* Install Node/NPM if not already. (node v6.11.0 and npm v3.10.10 were used for this app.)
* Build dependencies: run "npm i" in this directory. This only needs to be done once or if the dependencies in package.json change.
* Run "npm start" in this directory to start the application, and navigate to http://localhost:3000 to view
* Run "npm run build" in this directory to build the site to the "docs" folder. (Note: we are building to github pages, so we use "docs" instead of "dist")
* Run "npm run start-prod" in this directory to run the built site from the command above. Nagivate to http://localhost:8080 to view
* Run "npm test" and navigate to http://localhost:9876/ to run the unit tests.

License: MIT