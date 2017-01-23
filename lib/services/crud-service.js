System.register(["../../mock/users.json"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var users, services, CrudService;
    return {
        setters: [
            function (users_1) {
                users = users_1;
            }
        ],
        execute: function () {
            services = { "users": users.data };
            CrudService = (function () {
                function CrudService(service) {
                    this.service = service;
                    console.debug("CrudService.constructor");
                }
                CrudService.prototype.save = function (data) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        if (services[_this.service]) {
                            var index_1 = -1;
                            if (data.id) {
                                services[_this.service].forEach(function (item, i) {
                                    if (data.id == item.id) {
                                        index_1 = i;
                                        services[_this.service].splice(index_1, 1, data);
                                        return item;
                                    }
                                });
                            }
                            else {
                                data.id = services[_this.service].length + 1;
                                services[_this.service].push(data);
                                index_1 = Number(data.id) - 1;
                            }
                            if (index_1 != -1) {
                                resolve(services[_this.service][index_1]);
                            }
                            else {
                                reject(new Error("id not found"));
                            }
                        }
                        else {
                            reject(new Error("service not found"));
                        }
                    });
                };
                CrudService.prototype.load = function (id) {
                    return new Promise(function (resolve, reject) {
                        resolve();
                    });
                };
                CrudService.prototype.remove = function (id) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        if (services[_this.service]) {
                            if (services[_this.service].length > 0) {
                                services[_this.service].forEach(function (item, index) {
                                    if (item.id == id) {
                                        services[_this.service].splice(index, 1);
                                        return;
                                    }
                                });
                                resolve();
                            }
                            else {
                                resolve();
                            }
                        }
                        else {
                            reject(new Error("service not found"));
                        }
                    });
                };
                CrudService.prototype.search = function (criteria) {
                    return new Promise(function (resolve, reject) {
                    });
                };
                CrudService.prototype.getLast = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        if (services[_this.service]) {
                            if (services[_this.service].length > 0) {
                                resolve(services[_this.service][services[_this.service].length - 1]);
                            }
                            else {
                                resolve({});
                            }
                        }
                        else {
                            reject(new Error("service not found"));
                        }
                    });
                };
                return CrudService;
            }());
            exports_1("CrudService", CrudService);
            ;
        }
    };
});
