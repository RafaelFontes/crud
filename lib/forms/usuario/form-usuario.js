System.register(["@angular/core", "../form-component", "@angular/forms", "../../services/crud-service"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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
    var core_1, form_component_1, forms_1, crud_service_1, UsuarioForm;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (form_component_1_1) {
                form_component_1 = form_component_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (crud_service_1_1) {
                crud_service_1 = crud_service_1_1;
            }
        ],
        execute: function () {
            UsuarioForm = (function (_super) {
                __extends(UsuarioForm, _super);
                function UsuarioForm(componentFactoryResolver) {
                    var _this = _super.call(this, componentFactoryResolver) || this;
                    _this.targetService = "users";
                    console.debug("UsuarioForm.constructor");
                    return _this;
                }
                UsuarioForm.prototype.buildForm = function () {
                    this.addControl("id", new forms_1.FormControl("", null));
                    this.addControl("username", new forms_1.FormControl({ value: "", disabled: true }, null));
                    this.addControl("status", new forms_1.FormControl({ value: true, disabled: true }, forms_1.Validators.required));
                    this.addControl("password", new forms_1.FormControl({ value: "", disabled: true }, null));
                };
                UsuarioForm.prototype.populaDados = function () {
                    var _this = this;
                    var crudService = new crud_service_1.CrudService("users");
                    crudService.getLast().then(function (item) {
                        _this.form.get("id").setValue(item.id);
                        _this.form.get("username").setValue(item.username);
                        _this.form.get("status").setValue(item.status);
                        _this.form.get("password").setValue(item.password);
                        _this.formControls.instance.containsRegistry = true;
                    });
                };
                UsuarioForm.prototype.clearForm = function () {
                    this.enableForm();
                    this.form.get("status").setValue(true);
                };
                UsuarioForm.prototype.enableForm = function () {
                    this.form.get("username").enable();
                    this.form.get("password").enable();
                    this.form.get("status").enable();
                };
                UsuarioForm.prototype.cancelAction = function () {
                    this.form.get("username").disable();
                    this.form.get("password").disable();
                    this.form.get("status").disable();
                    this.populaDados();
                };
                return UsuarioForm;
            }(form_component_1.AbstractFormComponent));
            __decorate([
                core_1.ViewChild("container", { read: core_1.ViewContainerRef }),
                __metadata("design:type", core_1.ViewContainerRef)
            ], UsuarioForm.prototype, "container", void 0);
            UsuarioForm = __decorate([
                core_1.Component({
                    moduleId: __moduleName,
                    selector: 'form-usuario',
                    templateUrl: 'form.html',
                    styleUrls: ['form-usuario.css', '../form-component.css'],
                    providers: []
                }),
                __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
            ], UsuarioForm);
            exports_1("UsuarioForm", UsuarioForm);
        }
    };
});
