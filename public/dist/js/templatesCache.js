angular.module('bettingHost.tpls', []).run(['$templateCache', function($templateCache) {
    'use strict';
    $templateCache.put('partials/Dashboard.tpl.html',
        '<div class=panel-heading><h2>Tote Betting</h2></div><div class="panel-body clearfix"><div class="input-container pull-left"><h3>Race input</h3><i class="glyphicon glyphicon-question-sign" ng-click="vmDashboard.isHelpVisible = !vmDashboard.isHelpVisible"></i><form name=inputForm ng-submit=vmDashboard.processResult()><textarea name=bets class=input-bets rows=20 cols=30 ng-model=vmDashboard.race.input required></textarea><button type=submit class="btn btn-primary btn-results" ng-disabled=inputForm.$invalid>Results</button></form></div><div class="pull-left output" ng-if=!!vmDashboard.race.output><h3>Race output</h3><pre class="alert alert-info" ng-bind=vmDashboard.race.output></pre></div><div class="pull-left output error" ng-if=vmDashboard.race.error><h3>Invalid input</h3><pre class="alert alert-danger" ng-bind=vmDashboard.race.error></pre></div><div class="pull-left instructions" ng-show=vmDashboard.isHelpVisible><h3>Instructions</h3><div class="alert alert-warning"><ul><li>A given default file was given. The file is located at <i>public/resource/data.txt</i></li><li>The Race input can be changed by file or by form input</li><li>One Result and one or more Bet must be given to consider as valid input</li></ul></div></div></div><div class=panel-footer>Diego Souza - <a target=_blank href=https://github.com/diegofss11>GitHub</a></div>');
}]);
