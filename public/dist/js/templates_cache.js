angular.module('tourManager.tpls', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('partials/LoginForm.tpl.html',
        '<div class="row center-block"><div class="col-md-4 col-md-offset-4 col-xs-12"><form novalidated name=formLogin class=v-center ng-submit=vmLogin.authenticate()><div class=form-group><label for=login>Login</label><input required name=login class=form-control ng-model=vmLogin.user.login><div ng-if=formLogin.login.$dirty ng-messages=formLogin.login.$error><div ng-message=required class=text-error>This is required.</div></div></div><div class=form-group><label for=password>Password</label><input required type=password class=form-control name=password ng-model=vmLogin.user.password><div ng-if=formLogin.password.$dirty ng-messages=formLogin.password.$error><div ng-message=required class=text-error>This is required.</div></div></div><div class="columns cf bottom-action-area"><button ng-class="{disabled : formLogin.$invalid}" class="btn btn-primary btn-full-sm" type=submit>Login</button><div class=pull-right><button type=button class="btn btn-link btn-full-sm"><small>Forgot your password?</small></button> <span class=separator>|</span> <button type=button class="btn btn-link btn-full-sm" ng-click=vmLogin.openModal()>Sign up</button></div></div></form><div layout=row layout-align="end center"><div ng-click="vmLogin.authenticate(\'facebook\')" md-theme=cyan class=md-fab aria-label="Sign in with Facebook"><md-icon icon=/source/imgs/facebook-login64x64.svg class="icon-64x64 icon-margin"></md-icon></div><div ng-click="vmLogin.authenticate(\'google\')" md-theme=cyan class=md-fab aria-label="Sign in with Google"><md-icon icon=/source/imgs/google-login64x64.svg class="icon-64x64 icon-margin"></md-icon></div></div></div></div>');
    $templateCache.put('partials/SignInForm.tpl.html',
        '<div template-modal="Sign in" class=modal-sign-in close=vmSignIn.close()><form novalidated name=signInForm ng-submit=vmSignIn.register()><div class=form-group><label for=name>Name</label><input required name=name class=form-control ng-model=vmSignIn.newUser.name><div ng-if=signInForm.name.$dirty ng-messages=signInForm.name.$error><div ng-message=required class=text-error>This is required.</div></div></div><div class=form-group><label for=login>Login</label><input required name=login class=form-control ng-model=vmSignIn.newUser.login><div ng-if=signInForm.login.$dirty ng-messages=signInForm.login.$error><div ng-message=required class=text-error>This is required.</div></div></div><div class=form-group><label for=password>Email</label><input required type=email class=form-control name=email ng-model=vmSignIn.newUser.email><div ng-if=signInForm.email.$dirty ng-messages=signInForm.email.$error><div ng-message=required class=text-error>This is required.</div></div></div><div class=form-group><label for=password>Password</label><input required type=password class=form-control name=password ng-model=vmSignIn.newUser.password><div ng-if=signInForm.password.$dirty ng-messages=signInForm.password.$error><div ng-message=required class=text-error>This is required.</div></div></div><div class=form-group><label for=password>Confirm Password</label><input required type=password class=form-control name=confirmPassword ng-model=vmSignIn.newUser.confirmPassword compare-to=vmSignIn.newUser.password><div ng-if=signInForm.confirmPassword.$dirty ng-messages=signInForm.confirmPassword.$error><div ng-message=required class=text-error>This is required.</div><div ng-message=compareTo class=text-error>Must match the previous entry.</div></div></div><footer class="modal-footer sign-in grid"><button ng-class="{disabled : signInForm.$invalid}" class="btn btn-primary unit half pull-left" type=submit>Sign Up</button> <button type=button class="btn btn-default unit half pull-right" ng-click=vmSignIn.close()>Close</button></footer></form></div>');
    $templateCache.put('partials/TemplateModal.tpl.html',
        '<div class=modal-template><div class=modal-overlay ng-click=close()></div><div class=modal-dialog ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><header class=modal-header><button type=button class=close aria-label=Close ng-click=close()><span aria-hidden=true>&times;</span></button><h4 class=modal-title>{{ title }}</h4></header><div class=modal-transclude ng-transclude></div></div></div>');
}]);
