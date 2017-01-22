System.register(["@angular/core", "./storage-service"], function (exports_1, context_1) {
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
    var core_1, storage_service_1, AuthenticationState, AuthenticationErrorCode, AuthenticationService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            }
        ],
        execute: function () {
            (function (AuthenticationState) {
                AuthenticationState[AuthenticationState["UNDEFINED"] = 0] = "UNDEFINED";
                AuthenticationState[AuthenticationState["AUTHENTICATING"] = 1] = "AUTHENTICATING";
                AuthenticationState[AuthenticationState["AUTHENTICATED"] = 2] = "AUTHENTICATED";
                AuthenticationState[AuthenticationState["UNAUTHORIZED"] = 3] = "UNAUTHORIZED";
            })(AuthenticationState || (AuthenticationState = {}));
            exports_1("AuthenticationState", AuthenticationState);
            (function (AuthenticationErrorCode) {
                AuthenticationErrorCode[AuthenticationErrorCode["INVALID_USERNAME"] = 0] = "INVALID_USERNAME";
                AuthenticationErrorCode[AuthenticationErrorCode["INVALID_CREDENTIALS"] = 1] = "INVALID_CREDENTIALS";
                AuthenticationErrorCode[AuthenticationErrorCode["INVALID_PASSWORD"] = 2] = "INVALID_PASSWORD";
            })(AuthenticationErrorCode || (AuthenticationErrorCode = {}));
            exports_1("AuthenticationErrorCode", AuthenticationErrorCode);
            AuthenticationService = (function () {
                function AuthenticationService(storageService) {
                    this.storageService = storageService;
                    this.username = null;
                    console.debug("AuthenticationService.constructor");
                    if (this.storageService.get("username")) {
                        this.state = AuthenticationState.AUTHENTICATED;
                    }
                    else {
                        this.state = AuthenticationState.UNDEFINED;
                    }
                }
                Object.defineProperty(AuthenticationService.prototype, "authState", {
                    get: function () {
                        return this.state;
                    },
                    enumerable: true,
                    configurable: true
                });
                AuthenticationService.prototype.authenticate = function (username, password) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        if (password == '123') {
                            _this.storageService.insert("username", username);
                            _this.username = username;
                            _this.state = AuthenticationState.AUTHENTICATED;
                            resolve(_this.state);
                        }
                        else {
                            reject(new Error("AuthenticationErrorCode.INVALID_CREDENTIALS"));
                        }
                    });
                };
                AuthenticationService.prototype.logout = function () {
                    this.username = null;
                    this.state = AuthenticationState.UNDEFINED;
                    this.storageService.destroy("username");
                };
                return AuthenticationService;
            }());
            AuthenticationService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [storage_service_1.StorageService])
            ], AuthenticationService);
            exports_1("AuthenticationService", AuthenticationService);
        }
    };
});
