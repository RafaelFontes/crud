
import {
    Component, ViewContainerRef, ViewChild, ElementRef, ComponentFactoryResolver,
    EventEmitter
} from "@angular/core";
import {AbstractFormComponent} from "../form-component";
import {Validators, FormControl} from "@angular/forms";
import {CrudService} from "../../services/crud-service";

declare var __moduleName:any;

@Component({
    moduleId: __moduleName,
    selector: 'form-usuario',
    templateUrl: 'form.html',
    styleUrls:  ['form-usuario.css', '../form-component.css'],
    providers: []
})
export class UsuarioForm extends AbstractFormComponent
{
    @ViewChild("container", {read: ViewContainerRef}) container:ViewContainerRef;

    constructor(componentFactoryResolver: ComponentFactoryResolver )
    {
        super( componentFactoryResolver );

        this.targetService = "users";

        console.debug("UsuarioForm.constructor");
    }

    buildForm()
    {
        this.addControl( "id", new FormControl("", null) );
        this.addControl( "username", new FormControl({value: "", disabled: true}, null, ) );
        this.addControl( "status", new FormControl({value: true, disabled: true}, Validators.required) );
        this.addControl( "password", new FormControl({value: "", disabled: true}, null) );
    }

    populaDados()
    {
        let crudService = new CrudService("users");

        crudService.getLast().then ( (item:any) => {
            this.form.get("id").setValue(item.id);
            this.form.get("username").setValue(item.username);
            this.form.get("status").setValue(item.status);
            this.form.get("password").setValue(item.password);

            this.formControls.instance.containsRegistry = true;
        });
    }

    getSearchableFields() : string[]
    {
        return ["id", "username", "status"];
    }

    clearForm()
    {
        this.enableForm();
        this.form.get("status").setValue(true);
    }

    enableForm()
    {
        this.form.get("username").enable();
        this.form.get("password").enable();
        this.form.get("status").enable();
    }

    cancelAction()
    {
        this.form.get("username").disable();
        this.form.get("password").disable();
        this.form.get("status").disable();

        this.populaDados();
    }
}