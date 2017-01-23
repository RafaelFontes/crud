System.register(["@angular/forms", "@angular/core", "./controls/form-controls", "../services/crud-service"], function (exports_1, context_1) {
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
    var forms_1, core_1, form_controls_1, crud_service_1, AbstractFormComponent;
    return {
        setters: [
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (form_controls_1_1) {
                form_controls_1 = form_controls_1_1;
            },
            function (crud_service_1_1) {
                crud_service_1 = crud_service_1_1;
            }
        ],
        execute: function () {
            AbstractFormComponent = (function () {
                function AbstractFormComponent(componentFactoryResolver) {
                    this.componentFactoryResolver = componentFactoryResolver;
                    this.editMode = false;
                    this.form = null;
                    this.targetService = "";
                    this.exitEmitter = new core_1.EventEmitter();
                    this.saveEmitter = new core_1.EventEmitter();
                    this.form = new forms_1.FormGroup({});
                    this.buildForm();
                }
                AbstractFormComponent.prototype.addControl = function (name, control) {
                    this.form.addControl(name, control);
                };
                AbstractFormComponent.prototype.buildForm = function () { };
                AbstractFormComponent.prototype.isInEditMode = function () {
                    return this.editMode;
                };
                AbstractFormComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    var factory = this.componentFactoryResolver.resolveComponentFactory(form_controls_1.FormControlsComponent);
                    this.formControls = this.container.createComponent(factory);
                    this.formControls.instance.exitEmitter.subscribe(function () {
                        _this.formControls.destroy();
                        _this.exitEmitter.emit();
                        _this.editMode = false;
                    });
                    this.formControls.instance.saveEmitter.subscribe(function () {
                        _this.sendForm();
                        _this.editMode = false;
                    });
                    this.formControls.instance.newEmitter.subscribe(function () {
                        _this.editMode = true;
                        _this.form.reset();
                        _this.clearForm();
                    });
                    this.formControls.instance.cancelEmitter.subscribe(function () {
                        _this.editMode = false;
                        _this.cancelAction();
                    });
                    this.formControls.instance.changeEmitter.subscribe(function () {
                        _this.editMode = true;
                        _this.enableForm();
                    });
                    this.formControls.instance.removeEmitter.subscribe(function () {
                        _this.editMode = false;
                        var service = new crud_service_1.CrudService(_this.targetService);
                        service.remove(_this.form.get("id").value);
                        _this.populaDados();
                    });
                    this.populaDados();
                };
                AbstractFormComponent.prototype.populaDados = function () {
                };
                AbstractFormComponent.prototype.cancelAction = function () {
                };
                AbstractFormComponent.prototype.clearForm = function () {
                };
                AbstractFormComponent.prototype.enableForm = function () {
                };
                AbstractFormComponent.prototype.sendForm = function () {
                    var service = new crud_service_1.CrudService(this.targetService);
                    service.save(this.form.value);
                };
                return AbstractFormComponent;
            }());
            AbstractFormComponent = __decorate([
                core_1.Component({
                    selector: 'abs-form-component',
                    template: '',
                    moduleId: __moduleName,
                    providers: []
                }),
                __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
            ], AbstractFormComponent);
            exports_1("AbstractFormComponent", AbstractFormComponent);
        }
    };
});
