describe('E2E: INDEX', function(){
    var pageObjects = require('../PageObjects.util.js'),
        clickPromise, clearPromise, displayPromise,
        inputBets, btnResults, output;

    beforeEach(function() {
        pageObjects.setHomePage();

        inputBets = pageObjects.inputBets;
        btnResults = pageObjects.btnResults;
        output = pageObjects.output;
    });

    it('should have defined objects', function() {
        expect(inputBets).toBeDefined();
        expect(btnResults).toBeDefined();
        expect(output).toBeDefined();
    });

    describe('#instructions', function() {
        var btnHelp = pageObjects.instructions;

        it('should not show instructions at first', function() {
            displayPromise = btnHelp.isDisplayed();

            displayPromise.then(function(isDisplayed) {
                expect(isDisplayed).toBeFalsy();
            });
        });

        it('should show instructions once `helpButton` is clicked', function() {
            clickPromise = pageObjects.help.click();
            clickPromise.then(function() {
                displayPromise = btnHelp.isDisplayed();
                displayPromise.then(function(isDisplayed) {
                    expect(isDisplayed).toBeTruthy();
                });
            });
        });
    });

    describe('#loadData', function() {
        describe('SUCCESSFUL load', function() {
            it('should load data input in the textarea', function() {
                inputBets.getAttribute('value').then(function(text) {
                    expect(text).not.toBeUndefined();
                    expect(text).not.toBeNull();
                    expect(text).not.toBe('');
                });
            });
            it('should `btnResult` be enabled', function() {
                btnResults.isEnabled().then(function(isEnabled) {
                    expect(isEnabled).toBeTruthy();
                });
            });

            it('should show `outputDiv` when `btnResult` is clicked', function() {
                clickPromise = btnResults.click();
                clickPromise.then(function() {
                    displayPromise = output.isDisplayed();
                    displayPromise.then(function(isDisplayed) {
                        expect(isDisplayed).toBeTruthy();
                    });
                });
            });
        });

        describe('#UNSUCCESSFUL - load', function() {
            it('should `btnResult` be disabled', function() {
                clearPromise = inputBets.clear();
                clearPromise.then(function() {
                    btnResults.isEnabled().then(function(isEnabled) {
                        expect(isEnabled).toBeFalsy();
                    });
                });
            });
        });

    });

    describe('#invalidInput', function() {
        it('should show `alert-danger` message', function() {
            var error = pageObjects.error;

            clearPomise = inputBets.clear();
            clearPromise.then(function() {
                inputBets.sendKeys('invalid input').then(function() {
                    clickPromise = btnResults.click();
                    clickPromise.then(function() {
                        displayPromise = error.isDisplayed();
                        displayPromise.then(function(isDisplayed) {
                            expect(isDisplayed).toBeTruthy();
                        });
                    });
                });
            });
        });
    });
});