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
    var core_1, FormControlsComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            FormControlsComponent = (function () {
                function FormControlsComponent() {
                    this.exitEmitter = new core_1.EventEmitter();
                    this.saveEmitter = new core_1.EventEmitter();
                    this.newEmitter = new core_1.EventEmitter();
                    this.cancelEmitter = new core_1.EventEmitter();
                    this.changeEmitter = new core_1.EventEmitter();
                    this.removeEmitter = new core_1.EventEmitter();
                    this.changingMode = false;
                    this.newRegistry = false;
                    this.containsRegistry = false;
                    console.debug("FormControls.constructor");
                }
                FormControlsComponent.prototype.onChangeMenuClicked = function () {
                    this.changingMode = true;
                    this.newRegistry = false;
                    this.changeEmitter.emit();
                };
                FormControlsComponent.prototype.onNewMenuClicked = function () {
                    this.changingMode = true;
                    this.newRegistry = true;
                    this.newEmitter.emit();
                };
                FormControlsComponent.prototype.onCancelMenuClicked = function () {
                    this.changingMode = false;
                    this.newRegistry = false;
                    this.cancelEmitter.emit();
                };
                FormControlsComponent.prototype.onRemoveMenuClicked = function () {
                    this.removeEmitter.emit();
                    this.cancelEmitter.emit();
                };
                FormControlsComponent.prototype.onLeaveMenuClicked = function () {
                    this.exitEmitter.emit();
                };
                FormControlsComponent.prototype.onSaveMenuClicked = function () {
                    this.containsRegistry = true;
                    this.saveEmitter.emit();
                    this.cancelEmitter.emit();
                };
                return FormControlsComponent;
            }());
            __decorate([
                core_1.Output("exit"),
                __metadata("design:type", core_1.EventEmitter)
            ], FormControlsComponent.prototype, "exitEmitter", void 0);
            __decorate([
                core_1.Output("save"),
                __metadata("design:type", core_1.EventEmitter)
            ], FormControlsComponent.prototype, "saveEmitter", void 0);
            __decorate([
                core_1.Output("new"),
                __metadata("design:type", core_1.EventEmitter)
            ], FormControlsComponent.prototype, "newEmitter", void 0);
            __decorate([
                core_1.Output("cancel"),
                __metadata("design:type", core_1.EventEmitter)
            ], FormControlsComponent.prototype, "cancelEmitter", void 0);
            __decorate([
                core_1.Output("change"),
                __metadata("design:type", core_1.EventEmitter)
            ], FormControlsComponent.prototype, "changeEmitter", void 0);
            __decorate([
                core_1.Output("remove"),
                __metadata("design:type", core_1.EventEmitter)
            ], FormControlsComponent.prototype, "removeEmitter", void 0);
            FormControlsComponent = __decorate([
                core_1.Component({
                    moduleId: __moduleName,
                    selector: 'form-controls',
                    templateUrl: 'controls.html',
                    styleUrls: ['controls.css'],
                    providers: []
                }),
                __metadata("design:paramtypes", [])
            ], FormControlsComponent);
            exports_1("FormControlsComponent", FormControlsComponent);
        }
    };
});
