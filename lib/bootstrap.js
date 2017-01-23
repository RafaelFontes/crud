System.register(["reflect-metadata", "zone.js", "reset-css/reset.css!", "fontawsome/css/font-awesome.css!", "FontFaceKit/open-sans", "@angular/platform-browser-dynamic", "./modules/main-module", "@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, main_module_1, core_1;
    return {
        setters: [
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (_5) {
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (main_module_1_1) {
                main_module_1 = main_module_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            core_1.enableProdMode();
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(main_module_1.MainModule);
        }
    };
});
