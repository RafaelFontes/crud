

import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {FormControlsComponent} from "../forms/controls/form-controls";
import {MainComponent} from "../components/main/main-component";
import {MenuComponent} from "../components/menu/menu-component";
import {AuthenticationComponent} from "../components/authentication/authentication-component";
import {AuthenticationService} from "../services/authentication-service";
import {StorageService} from "../services/storage-service";
import {UsuarioForm} from "../forms/usuario/form-usuario";
import {AbstractFormComponent} from "../forms/form-component";
import {DraggableComponent} from "../components/draggable/draggable-component";

@NgModule({
    imports :[ BrowserModule, FormsModule, ReactiveFormsModule ],
    bootstrap : [ MainComponent ],
    providers : [ StorageService, AuthenticationService],
    declarations: [ DraggableComponent, AbstractFormComponent, UsuarioForm, MainComponent, MenuComponent, AuthenticationComponent, FormControlsComponent ],
    entryComponents: [ UsuarioForm, FormControlsComponent ]

})
export class MainModule
{
    constructor()
    {
        console.debug("MainModule.constructor");
    }
}