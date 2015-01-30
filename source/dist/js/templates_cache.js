angular.module('tourManager.tpls', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('partials/LoginForm.tpl.html',
        '<div class="row center-block"><div class="col-md-4 col-md-offset-4"><form novalidated name=formLogin class=v-center ng-submit=vmLogin.authenticate()><div class=form-group><label for=login>Login</label><input required name=login class=form-control ng-model=vmLogin.user.login><div ng-if=formLogin.login.$dirty ng-messages=formLogin.login.$error><div ng-message=required class=text-danger>This is required.</div></div></div><div class=form-group><label for=password>Password</label><input required type=password class=form-control name=password ng-model=vmLogin.user.password><div ng-if=formLogin.password.$dirty ng-messages=formLogin.password.$error><div ng-message=required class=text-danger>This is required.</div></div></div><div class="columns cf"><input ng-class="{disabled : formLogin.$invalid}" class="btn btn-primary" type=submit value=Login><div class=pull-right><button type=button class="btn btn-link"><small>Forgot your password?</small></button> | <button type=button class="btn btn-link" ng-click=vmLogin.openModal()>Sign up</button></div></div></form><div layout=row layout-align="end center"><div ng-click="vmLogin.authenticate(\'facebook\')" md-theme=cyan class=md-fab aria-label="Sign in with Facebook"><md-icon icon=/source/imgs/facebook-login64x64.svg class="icon-64x64 icon-margin"></md-icon></div><div ng-click="vmLogin.authenticate(\'google\')" md-theme=cyan class=md-fab aria-label="Sign in with Google"><md-icon icon=/source/imgs/google-login64x64.svg class="icon-64x64 icon-margin"></md-icon></div></div></div></div>');
    $templateCache.put('partials/SignupForm.tpl.html',
        '<div class="signUp-modal col-md-4 col-md-offset-4"><form novalidated name=signUpForm class=v-center ng-submit=vmSignUp.signUp()><div class=form-group><label for=name>Name</label><input required name=name class=form-control ng-model=vmSignUp.newUser.name><div ng-if=signUpForm.name.$dirty ng-messages=signUpForm.name.$error><div ng-message=required class=text-danger>This is required.</div></div></div><div class=form-group><label for=login>Login</label><input required name=login class=form-control ng-model=vmSignUp.newUser.login><div ng-if=signUpForm.login.$dirty ng-messages=signUpForm.login.$error><div ng-message=required class=text-danger>This is required.</div></div></div><div class=form-group><label for=password>Email</label><input required class=form-control name=email ng-model=vmSignUp.newUser.email><div ng-if=signUpForm.email.$dirty ng-messages=signUpForm.email.$error><div ng-message=required class=text-danger>This is required.</div></div></div><div class=form-group><label for=password>Password</label><input required type=password class=form-control name=password ng-model=vmSignUp.newUser.password><div ng-if=signUpForm.password.$dirty ng-messages=signUpForm.password.$error><div ng-message=required class=text-danger>This is required.</div></div></div><div class=form-group><label for=password>Confirm Password</label><input required type=password class=form-control name=confirmPassword ng-model=vmSignUp.newUser.confirmPassword compare-to=vmSignUp.newUser.password><div ng-if=signUpForm.confirmPassword.$dirty ng-messages=signUpForm.confirmPassword.$error><div ng-message=required class=text-danger>This is required.</div><div ng-message=compareTo class=text-danger>Must match the previous entry.</div></div></div><footer class="form-group footer-btn"><input ng-class="{disabled : signUpForm.$invalid}" class="btn btn-primary" type=submit value="Sign up"> <input type=button class="btn btn-default" value=Close></footer></form></div>');
    $templateCache.put('partials/TemplateModal.tpl.html',
        '<div class=template-modal><div class=modal-overlay ng-click=close()></div><div class=modal><header class=modal-header><button class="btn-text modal-close" ng-click=close()>×</button><h1 class="modal-title heading-large">{{ title }}</h1></header><div class=modal-content ng-transclude></div></div></div>');
}]);
