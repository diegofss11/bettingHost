angular.module('bettingHost.tpls', []).run(['$templateCache', function($templateCache) {
    'use strict';
    $templateCache.put('partials/Main.tpl.html',
        '<div class=panel-heading><h2>Tote Betting</h2><h4>Betting Host Application</h4></div><div class="panel-body clearfix"><div class="input-container pull-left"><h3>Race input</h3><i class="glyphicon glyphicon-question-sign" ng-click="vmBet.isHelpVisible = !vmBet.isHelpVisible"></i><form name=inputForm ng-submit=vmBet.processResult()><textarea name=bets class=input-bets rows=30 cols=30 ng-model=vmBet.race.input required></textarea><button type=submit class="btn btn-primary btn-results" ng-disabled=inputForm.$invalid>Results</button></form></div><div class="pull-left output" ng-if=!!vmBet.race.output><h3>Race output</h3><pre class="alert alert-info" ng-bind=vmBet.race.output></pre></div><div class="pull-left output error" ng-if=vmBet.race.error><h3>Invalid input</h3><pre class="alert alert-danger" ng-bind=vmBet.race.error></pre></div><div class="pull-left instructions" ng-show=vmBet.isHelpVisible><h3>Instructions</h3><div class="alert alert-warning"><ul><li>A default file was provided. The file is located at <i>public/resource/data.txt</i></li><li>The Race input can be changed by file or by form input</li><li><b>1 RESULT</b> and <b>1 or * BET</b> is consider as a valid input</li><li>Bet that does not follow the standard <i>Bet:product:selections:stake</i> will be ignored by regex</li><li>Result that does not follow the standard <i>Result:first:second:third</i> will show invalid input</li></ul></div></div></div><div class=panel-footer>Diego Souza - <a target=_blank href=https://github.com/diegofss11>GitHub</a></div>');
}]);
