

import {BrowserModule} from "@angular/platform-browser";
import {NgModule, ComponentRef} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {MainComponent} from "../components/main/main-component";
import {MenuComponent} from "../components/menu/menu-component";
import {AuthenticationComponent} from "../components/authentication/authentication-component";
import {AuthenticationService} from "../services/authentication-service";
import {StorageService} from "../services/storage-service";
import {UsuarioForm} from "../forms/usuario/index";

@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    providers : [ StorageService, AuthenticationService ],
    declarations: [ UsuarioForm, MainComponent, MenuComponent, AuthenticationComponent ],
    bootstrap : [ MainComponent ],
    entryComponents: [ UsuarioForm ]

})
export class MainModule
{
    constructor()
    {
        console.debug("MainModule.constructor");
    }
}