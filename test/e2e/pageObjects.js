(function() {
    'use strict';

    var PageObject = function() {
        this.testElement = element(By.css('.test'));   
    };

    module.exports = new PageObject();
})();



