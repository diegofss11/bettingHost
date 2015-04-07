(function() {
    var PageObjects = function() {
        this.inputBets = element(by.tagName('textarea'));
        this.btnResults = element(by.css('.btn-results'));
        this.output = element(by.css('.output'));
        this.help = element(by.css('.glyphicon-question-sign'));
        this.instructions = element(by.css('.instructions'));
        this.error = element(by.css('.alert-danger'));

        this.setHomePage = function() {
            browser.get('http://localhost:3030/#/');//navigates the router to the route
            browser.waitForAngular();
        };
    };

    module.exports = new PageObjects();
}());