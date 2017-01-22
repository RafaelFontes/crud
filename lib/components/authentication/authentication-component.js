System.register(["@angular/core", "../../services/authentication-service", "gsap"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, authentication_service_1, TweenLite, AuthenticationStep, AuthenticationComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (TweenLite_1) {
                TweenLite = TweenLite_1;
            }
        ],
        execute: function () {
            ;
            (function (AuthenticationStep) {
                AuthenticationStep[AuthenticationStep["USERNAME"] = 0] = "USERNAME";
                AuthenticationStep[AuthenticationStep["PASSWORD"] = 1] = "PASSWORD";
                AuthenticationStep[AuthenticationStep["AUTHENTICATING"] = 2] = "AUTHENTICATING";
            })(AuthenticationStep || (AuthenticationStep = {}));
            exports_1("AuthenticationStep", AuthenticationStep);
            AuthenticationComponent = (function () {
                function AuthenticationComponent(authenticationService) {
                    this.authenticationService = authenticationService;
                    this.usernameFieldValue = "";
                    this.passwordFieldValue = "";
                    this.USERNAME_STEP = AuthenticationStep.USERNAME;
                    this.PASSWORD_STEP = AuthenticationStep.PASSWORD;
                    this.AUTHENTICATING_STEP = AuthenticationStep.AUTHENTICATING;
                    this.stateChange = new core_1.EventEmitter();
                    this.errorMessage = null;
                    this.step = AuthenticationStep.USERNAME;
                    console.debug("AuthenticationComponent.constructor");
                }
                AuthenticationComponent.prototype.ngAfterViewInit = function () {
                    TweenLite.to(document.getElementById("username"), 0.1, { 'margin-left': 0, ease: Expo.easeOut });
                };
                AuthenticationComponent.prototype.authenticate = function () {
                    var _this = this;
                    this.stateChange.emit(authentication_service_1.AuthenticationState.AUTHENTICATING);
                    this.authenticationService.authenticate(this.usernameFieldValue, this.passwordFieldValue).then(function (state) {
                        _this.stateChange.emit(state);
                        _this.errorMessage = null;
                    }).catch(function (ex) {
                        _this.errorMessage = ex.message;
                        _this.stateChange.emit(authentication_service_1.AuthenticationState.UNAUTHORIZED);
                    });
                };
                Object.defineProperty(AuthenticationComponent.prototype, "currentStep", {
                    get: function () {
                        return this.step;
                    },
                    enumerable: true,
                    configurable: true
                });
                AuthenticationComponent.prototype.nextStep = function () {
                    var _this = this;
                    if (this.currentStep == AuthenticationStep.USERNAME && this.usernameFieldValue != "") {
                        this.step = AuthenticationStep.PASSWORD;
                        TweenLite.to(this.username.nativeElement, 0.1, { 'margin-left': -500, ease: Expo.easeIn,
                            onComplete: function () {
                                TweenLite.to(_this.password.nativeElement, 0.1, { 'margin-left': 0, ease: Expo.easeOut,
                                    onComplete: function () {
                                        _this.password.nativeElement.focus();
                                    }
                                });
                            }
                        });
                    }
                    else {
                    }
                };
                AuthenticationComponent.prototype.prevStep = function () {
                    var _this = this;
                    if (this.currentStep == AuthenticationStep.PASSWORD) {
                        this.step = AuthenticationStep.USERNAME;
                        TweenLite.to(this.password.nativeElement, 0.1, { 'margin-left': 500, ease: Expo.easeIn, onComplete: function () {
                                TweenLite.to(_this.username.nativeElement, 0.1, { 'margin-left': 0, ease: Expo.easeOut, onComplete: function () {
                                        _this.username.nativeElement.focus();
                                    } });
                            } });
                    }
                };
                return AuthenticationComponent;
            }());
            __decorate([
                core_1.ViewChild("username"),
                __metadata("design:type", core_1.ElementRef)
            ], AuthenticationComponent.prototype, "username", void 0);
            __decorate([
                core_1.ViewChild("password"),
                __metadata("design:type", core_1.ElementRef)
            ], AuthenticationComponent.prototype, "password", void 0);
            __decorate([
                core_1.Output("stateChange"),
                __metadata("design:type", core_1.EventEmitter)
            ], AuthenticationComponent.prototype, "stateChange", void 0);
            AuthenticationComponent = __decorate([
                core_1.Component({
                    moduleId: __moduleName,
                    selector: 'authentication',
                    templateUrl: 'authentication.html',
                    styleUrls: ['authentication.css'],
                    providers: []
                }),
                __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
            ], AuthenticationComponent);
            exports_1("AuthenticationComponent", AuthenticationComponent);
        }
    };
});
