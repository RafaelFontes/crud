System.register(["@angular/core", "../../services/authentication-service", "../menu/menu-component", "../../forms/usuario/form-usuario"], function (exports_1, context_1) {
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
    var core_1, authentication_service_1, menu_component_1, form_usuario_1, MainComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (menu_component_1_1) {
                menu_component_1 = menu_component_1_1;
            },
            function (form_usuario_1_1) {
                form_usuario_1 = form_usuario_1_1;
            }
        ],
        execute: function () {
            MainComponent = (function () {
                function MainComponent(authenticationService, componentFactoryResolver) {
                    this.authenticationService = authenticationService;
                    this.componentFactoryResolver = componentFactoryResolver;
                    this.menuEnabled = false;
                    this.currentComponentRef = null;
                    console.debug("MainComponent.constructor");
                    this.menuEnabled = this.isAuthenticated();
                    if (this.currentComponentRef) {
                        this.currentComponentRef.destroy();
                    }
                }
                MainComponent.prototype.isAuthenticated = function () {
                    return this.authenticationService.authState == authentication_service_1.AuthenticationState.AUTHENTICATED;
                };
                MainComponent.prototype.onAuthenticationStateChanged = function (state) {
                    this.menuEnabled = (state == authentication_service_1.AuthenticationState.AUTHENTICATED);
                };
                MainComponent.prototype.isMenuEnabled = function () {
                    return this.menuEnabled;
                };
                MainComponent.prototype.onMenuChanged = function (option) {
                    switch (option) {
                        case menu_component_1.MenuOptions.LOGOUT:
                            this.authenticationService.logout();
                            this.menuEnabled = false;
                            break;
                        case menu_component_1.MenuOptions.FORM_USUARIO:
                            this.setCurrentComponent(form_usuario_1.UsuarioForm);
                            break;
                    }
                };
                MainComponent.prototype.setCurrentComponent = function (component) {
                    var _this = this;
                    var factory = this.componentFactoryResolver.resolveComponentFactory(component);
                    if (this.currentComponentRef) {
                        this.currentComponentRef.destroy();
                    }
                    this.currentComponentRef = this.menuComponent.createComponent(factory);
                    this.currentComponentRef.instance.exitEmitter.subscribe(function () {
                        _this.currentComponentRef.destroy();
                    });
                };
                return MainComponent;
            }());
            __decorate([
                core_1.ViewChild('menuComponent', { read: core_1.ViewContainerRef }),
                __metadata("design:type", core_1.ViewContainerRef)
            ], MainComponent.prototype, "menuComponent", void 0);
            MainComponent = __decorate([
                core_1.Component({
                    moduleId: __moduleName,
                    selector: 'main',
                    templateUrl: 'main.html',
                    styleUrls: ['main.css'],
                    providers: [authentication_service_1.AuthenticationService]
                }),
                __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, core_1.ComponentFactoryResolver])
            ], MainComponent);
            exports_1("MainComponent", MainComponent);
        }
    };
});
