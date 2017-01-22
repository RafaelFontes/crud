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
    var core_1, StorageService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            StorageService = (function () {
                function StorageService() {
                    console.debug("StorageService.constructor");
                }
                StorageService.prototype.insert = function (key, value) {
                    localStorage.setItem(key, JSON.stringify(value));
                };
                StorageService.prototype.get = function (key) {
                    return JSON.parse(localStorage.getItem(key));
                };
                StorageService.prototype.destroy = function (key) {
                    localStorage.removeItem(key);
                };
                return StorageService;
            }());
            StorageService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [])
            ], StorageService);
            exports_1("StorageService", StorageService);
        }
    };
});
