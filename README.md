# tourManager
An application to manager your competitors and tournaments

## Technology Stack

* <b>[MEAN Stack]</b> - stands for <b>M</b>ongoDB, <b>E</b>xpress, <b>A</b>ngularJS, <b>N</b>ode.js

* [AngularJS](http://www.angularjs.org/) - Open-source JavaScript framework maintained by Google
* CSS based on [Bootstrap](http://getbootstrap.com/)
* Unit tests by [Jasmine Framework](http://jasmine.github.io/) - Open-source testing framework for JavaScript
* [SASS - Syntactically Awesome Style Sheets ] (http://sass-lang.com/) - Sass is an extension of CSS that adds power and elegance to the basic language
* [Karma] (http://karma-runner.github.io/0.12/index.html) -  Spawns a web server that executes source code against test code
* [Protractor] (https://github.com/angular/protractor) - Protractor is an end to end test framework built for AngularJS
* [Express] (http://expressjs.com/) - Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications
* [NodeJS] (http://nodejs.org/) - Plataform for easily building fast, scalable network applications - API REST using this tool
* [MongoDB] (http://www.mongodb.org/) - An open-source document database, and the leading NoSQL database
* [MongoLAB] (https://mongolab.com) - Fully-managed platform used by developers to deploy, host and scale MongoDB databases. The database of tourManager is hosted on this plataform


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
    git clone https://github.com/diegofss11/tourManager.git
    cd tourManager
    ```

### App Server

The application server is a NodeJS application that relies upon some 3rd Party npm packages.  You need to install these:

* Install local dependencies (from the project root folder):

    ```
    cd tourManager
    npm install
    ```

  (This will install the dependencies declared in the package.json file)
  
* To run the CLIENTE project:
   
    ```
    cd tourManager
    grunt
    ```

The application is hosted in (http://localhost:8001/)

* To run the node REST API server

    ```
    cd tourManager
    node server.js
    ```
* To run debug mode - it opens a new browser page for debugging

    ```
    cd tourManager
    node-debug app.js
    ```

