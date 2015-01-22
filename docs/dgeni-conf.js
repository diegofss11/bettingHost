// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path'),
    Package = require('dgeni').Package;

// Create and export a new Dgeni package called dgeni-example. This package depends upon
// the jsdoc and nunjucks packages defined in the dgeni-packages npm module.
module.exports = new Package('dgeni-conf', [
    require('dgeni-packages/jsdoc'),
    require('dgeni-packages/nunjucks')
])

// Configure our dgeni-example package. We can ask the Dgeni dependency injector
// to provide us with access to services and processors that we wish to configure
.config(function(log, readFilesProcessor, templateFinder, writeFilesProcessor) {

    // Set logging level
    log.level = 'info';

    // Specify the base path used when resolving relative paths to source and output files
    readFilesProcessor.basePath = path.resolve(__dirname, '..');

    // Specify collections of source files that should contain the documentation to extract
    readFilesProcessor.sourceFiles = [
    {
        include: 'source/js/**/*.js', basePath: 'source'
    }
    ];

    // Add a folder to search for our own templates to use when rendering docs
    templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));


    // Specify how to match docs to templates.
    // In this case we just use the same static template for all docs
    templateFinder.templatePatterns.unshift('common.template.html');
   
    // Specify where the writeFilesProcessor will write our generated doc files
    writeFilesProcessor.outputFolder  = 'docs';
});