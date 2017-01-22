
import {Component} from "@angular/core";
import {IFormComponent} from "../form-component";

declare var __moduleName:any;

@Component({
    moduleId: __moduleName,
    selector: 'form-usuario',
    templateUrl: 'form.html',
    styleUrls:  ['form-usuario.css'],
    providers: []
})
export class UsuarioForm implements IFormComponent
{
    constructor()
    {
        console.debug("UsuarioForm.constructor");
    }
}