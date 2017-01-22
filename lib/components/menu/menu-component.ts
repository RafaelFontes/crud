
import {Component, Output, EventEmitter} from "@angular/core";
declare var __moduleName:any;

export enum MenuOptions
{
    LOGOUT,
    FORM_USUARIO
}

@Component({
    moduleId: __moduleName,
    selector: 'menu',
    templateUrl: 'menu.html',
    styleUrls:  ['menu.css'],
    providers: []
})
export class MenuComponent
{
    readonly LOGOUT_OPTION = MenuOptions.LOGOUT;
    readonly FORM_USUARIO = MenuOptions.FORM_USUARIO;

    @Output("menuChange") menuChange:EventEmitter<MenuOptions> = new EventEmitter<MenuOptions>();

    constructor()
    {
        console.debug("MenuComponent.constructor")
    }

    changeMenu( option: MenuOptions )
    {
        console.debug("MenuComponent.changeMenu", option);

        this.menuChange.emit( option );
    }
}