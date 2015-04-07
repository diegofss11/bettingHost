# BettingHost
Simplified Tote Betting application

## Technology Stack

* CSS based on [Bootstrap](http://getbootstrap.com/)
* [AngularJS](http://www.angularjs.org/) - Open-source JavaScript framework maintained by Google
* [Jasmine Framework](http://jasmine.github.io/) - Open-source testing framework for JavaScript
* [Protractor] (https://github.com/angular/protractor) - Protractor is an end to end test framework built for AngularJS
* [SASS - Syntactically Awesome Style Sheets ] (http://sass-lang.com/) - Sass is an extension of CSS that adds power and elegance to the basic language
* [Karma] (http://karma-runner.github.io/0.12/index.html) -  Spawns a web server that executes source code against test code
* [NodeJS] (http://nodejs.org/) - Plataform for easily building fast, scalable network applications - API REST using this tool
* [Express] (http://expressjs.com/) - Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications
* [Heroku] (http://heroku.com/) - Heroku is a Cloud Application Plataform (PaaS)

##Acessing application on Heroku
The application is hosted on Heroku. To access: [https://tote-betting-application.herokuapp.com/](https://tote-betting-application.herokuapp.com/)

## Installation

### Platform & tools

You need to install Node.js and then the development tools. Node.js comes with a package manager called [npm](http://npmjs.org) for installing NodeJS applications and libraries.
* [Install node.js](http://nodejs.org/download/)
* Install Grunt-CLI as global npm modules:

    ```
    npm install -g grunt-cli
    ```

### Get the Code

Either clone this repository or fork it on GitHub and clone your fork:

    ```
    git clone https://github.com/diegofss11/bettingHost.git
    cd bettingHost
    ```

### App Server

The application server is a NodeJS application that relies upon some 3rd Party npm packages.  You need to install these:

* Install Node.js modules dependencies (from the project root folder):

    ```
    cd bettingHost
    npm install
    ```

  (This will install the dependencies declared in the package.json file)

* Install library dependencies (from the project root folder):

    ```
    cd bettingHost
    bower install
    ```

  (This will install the dependencies declared in the package.json file)


* To build the CLIENT project:

    ```
    cd bettingHost
    grunt
    ```
* To run the node application server

    ```
    cd bettingHost
    node server.js
    ```
* The application will be in [(http://localhost:3030/)] (http://localhost:3030/)

* In order to run unit tests, please execute
    ```
    grunt tdd
    ```

* In order to run End2End tests, please install protractor globally and install/update webdriver-manager:
    ```
    npm install -g protractor
    webdriver-manager update
    ```

* once the above step is done, please execute
    ```
    grunt e2e
    ```

* Bet instructions can be found on the application