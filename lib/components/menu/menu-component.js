System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, MenuOptions, MenuComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            (function (MenuOptions) {
                MenuOptions[MenuOptions["LOGOUT"] = 0] = "LOGOUT";
                MenuOptions[MenuOptions["FORM_USUARIO"] = 1] = "FORM_USUARIO";
            })(MenuOptions || (MenuOptions = {}));
            exports_1("MenuOptions", MenuOptions);
            MenuComponent = (function () {
                function MenuComponent() {
                    this.LOGOUT_OPTION = MenuOptions.LOGOUT;
                    this.FORM_USUARIO = MenuOptions.FORM_USUARIO;
                    this.menuChange = new core_1.EventEmitter();
                    console.debug("MenuComponent.constructor");
                }
                MenuComponent.prototype.changeMenu = function (option) {
                    console.debug("MenuComponent.changeMenu", option);
                    this.menuChange.emit(option);
                };
                return MenuComponent;
            }());
            __decorate([
                core_1.Output("menuChange"),
                __metadata("design:type", core_1.EventEmitter)
            ], MenuComponent.prototype, "menuChange", void 0);
            MenuComponent = __decorate([
                core_1.Component({
                    moduleId: __moduleName,
                    selector: 'menu',
                    templateUrl: 'menu.html',
                    styleUrls: ['menu.css'],
                    providers: []
                }),
                __metadata("design:paramtypes", [])
            ], MenuComponent);
            exports_1("MenuComponent", MenuComponent);
        }
    };
});
