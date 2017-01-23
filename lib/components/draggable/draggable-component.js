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
    var core_1, DraggableComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            DraggableComponent = (function () {
                function DraggableComponent() {
                    var _this = this;
                    this.isDragging = false;
                    console.debug('DraggableComponent.constructor');
                    window.addEventListener("mousemove", function (e) {
                        if (_this.isDragging) {
                            _this.target.style.position = 'absolute';
                            _this.target.style.left = _this.startLeft + (e.clientX - _this.startMouseEvent.clientX) + "px";
                            _this.target.style.top = _this.startTop + (e.clientY - _this.startMouseEvent.clientY) + "px";
                        }
                    });
                    window.addEventListener("mouseup", function () {
                        _this.isDragging = false;
                        _this.target = null;
                    });
                }
                DraggableComponent.prototype.onMouseDown = function (e) {
                    this.isDragging = true;
                    this.target = e.currentTarget;
                    this.target = this.target.parentElement.parentElement;
                    this.startMouseEvent = e;
                    this.startLeft = this.target.offsetLeft;
                    this.startTop = this.target.offsetTop;
                };
                return DraggableComponent;
            }());
            DraggableComponent = __decorate([
                core_1.Component({
                    moduleId: __moduleName,
                    template: '<div (mousedown)="onMouseDown($event)"></div> ',
                    selector: 'draggable'
                }),
                __metadata("design:paramtypes", [])
            ], DraggableComponent);
            exports_1("DraggableComponent", DraggableComponent);
        }
    };
});
