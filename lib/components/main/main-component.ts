
import {
    Component, ComponentRef, ComponentFactoryResolver, ViewChild,
    ViewContainerRef, Type
} from "@angular/core";
import {AuthenticationService, AuthenticationState} from "../../services/authentication-service";
import {MenuOptions} from "../menu/menu-component";
import {UsuarioForm} from "../../forms/usuario/form-usuario";
import {IFormComponent, AbstractFormComponent} from "../../forms/form-component";
declare var __moduleName:any;

@Component({
    moduleId: __moduleName,
    selector: 'main',
    templateUrl: 'main.html',
    styleUrls:  ['main.css'],
    providers : [ AuthenticationService ]
})
export class MainComponent
{
    @ViewChild('menuComponent', {read: ViewContainerRef}) menuComponent:ViewContainerRef;

    private menuEnabled:boolean = false;
    private currentComponentRef:ComponentRef<AbstractFormComponent> = null;

    constructor(private authenticationService:AuthenticationService, private componentFactoryResolver: ComponentFactoryResolver )
    {
        console.debug("MainComponent.constructor");
        this.menuEnabled = this.isAuthenticated();

        if ( this.currentComponentRef )
        {
            this.currentComponentRef.destroy();
        }
    }

    isAuthenticated() : boolean
    {
        return this.authenticationService.authState == AuthenticationState.AUTHENTICATED;
    }

    onAuthenticationStateChanged( state:AuthenticationState )
    {
        this.menuEnabled = ( state == AuthenticationState.AUTHENTICATED );
    }

    isMenuEnabled() : boolean
    {
        return this.menuEnabled;
    }

    onMenuChanged( option: MenuOptions ) : void
    {

        switch ( option )
        {
            case MenuOptions.LOGOUT:
                this.authenticationService.logout();
                this.menuEnabled = false;
                break;

            case MenuOptions.FORM_USUARIO:

                this.setCurrentComponent( UsuarioForm );

                break;
        }
    }

    setCurrentComponent ( component:Type<AbstractFormComponent> )
    {
        let factory = this.componentFactoryResolver.resolveComponentFactory( component );

        if ( this.currentComponentRef )
        {
            this.currentComponentRef.destroy();
        }

        this.currentComponentRef = this.menuComponent.createComponent(factory);
        this.currentComponentRef.instance.exitEmitter.subscribe( () => {

            this.currentComponentRef.destroy();

        });
    }
}