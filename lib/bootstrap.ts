import 'reflect-metadata'
import 'zone.js'
import 'reset-css/reset.css!';
import 'fontawsome/css/font-awesome.css!';
import 'FontFaceKit/open-sans'

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {MainModule} from "./modules/main-module";
import {enableProdMode} from "@angular/core";

enableProdMode();

platformBrowserDynamic().bootstrapModule(MainModule);