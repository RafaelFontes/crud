System.register(["@angular/platform-browser", "@angular/core", "@angular/forms", "../forms/controls/form-controls", "../components/main/main-component", "../components/menu/menu-component", "../components/authentication/authentication-component", "../services/authentication-service", "../services/storage-service", "../forms/usuario/form-usuario", "../forms/form-component", "../components/draggable/draggable-component"], function (exports_1, context_1) {
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
    var platform_browser_1, core_1, forms_1, form_controls_1, main_component_1, menu_component_1, authentication_component_1, authentication_service_1, storage_service_1, form_usuario_1, form_component_1, draggable_component_1, MainModule;
    return {
        setters: [
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (form_controls_1_1) {
                form_controls_1 = form_controls_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            },
            function (menu_component_1_1) {
                menu_component_1 = menu_component_1_1;
            },
            function (authentication_component_1_1) {
                authentication_component_1 = authentication_component_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            },
            function (form_usuario_1_1) {
                form_usuario_1 = form_usuario_1_1;
            },
            function (form_component_1_1) {
                form_component_1 = form_component_1_1;
            },
            function (draggable_component_1_1) {
                draggable_component_1 = draggable_component_1_1;
            }
        ],
        execute: function () {
            MainModule = (function () {
                function MainModule() {
                    console.debug("MainModule.constructor");
                }
                return MainModule;
            }());
            MainModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
                    bootstrap: [main_component_1.MainComponent],
                    providers: [storage_service_1.StorageService, authentication_service_1.AuthenticationService],
                    declarations: [draggable_component_1.DraggableComponent, form_component_1.AbstractFormComponent, form_usuario_1.UsuarioForm, main_component_1.MainComponent, menu_component_1.MenuComponent, authentication_component_1.AuthenticationComponent, form_controls_1.FormControlsComponent],
                    entryComponents: [form_usuario_1.UsuarioForm, form_controls_1.FormControlsComponent]
                }),
                __metadata("design:paramtypes", [])
            ], MainModule);
            exports_1("MainModule", MainModule);
        }
    };
});
