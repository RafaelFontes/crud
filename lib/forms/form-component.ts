import {FormGroup, FormControl, Form} from "@angular/forms";
import {ViewContainerRef, Component, ComponentFactoryResolver, ComponentRef, EventEmitter} from "@angular/core";
import {FormControlsComponent} from "./controls/form-controls";
import {CrudService} from "../services/crud-service";
import {SearchComponent} from "../components/search/search-component";

declare var __moduleName:any;

export interface IFormComponent
{
}

@Component({
    selector: 'abs-form-component',
    template: '',
    moduleId: __moduleName,
    providers: []
})
export class AbstractFormComponent implements IFormComponent
{
    public exitEmitter:EventEmitter<void>;
    public saveEmitter:EventEmitter<void>;

    protected container:ViewContainerRef;
    protected editMode:boolean = false;
    protected form:FormGroup = null;

    protected targetService:string = "";

    protected formControls:ComponentRef<FormControlsComponent>;

    constructor( private componentFactoryResolver: ComponentFactoryResolver )
    {
        this.exitEmitter  = new EventEmitter<void>();
        this.saveEmitter  = new EventEmitter<void>();

        this.form = new FormGroup({});
        this.buildForm();
    }

    addControl( name:string, control : FormControl ) {

        this.form.addControl( name, control );
    }

    protected buildForm() : void { }

    isInEditMode() : boolean
    {
        return this.editMode;
    }

    ngAfterViewInit() {
        let factory = this.componentFactoryResolver.resolveComponentFactory( FormControlsComponent );

        this.formControls = this.container.createComponent(factory);

        this.formControls.instance.exitEmitter.subscribe( () => {
            this.formControls.destroy();
            this.exitEmitter.emit();
            this.editMode = false;
        });

        this.formControls.instance.saveEmitter.subscribe( () => {
            this.sendForm();
            this.editMode = false;
        });

        this.formControls.instance.newEmitter.subscribe( () => {
            this.editMode = true;
            this.form.reset();
            this.clearForm();
        });

        this.formControls.instance.cancelEmitter.subscribe( () => {
            this.editMode = false;
            this.cancelAction();
        });

        this.formControls.instance.changeEmitter.subscribe( () => {

            this.editMode = true;
            this.enableForm();

        });

        this.formControls.instance.removeEmitter.subscribe( () => {

            this.editMode = false;

            let service = new CrudService(this.targetService);

            service.remove(this.form.get("id").value);

            this.populaDados();

        });

        this.formControls.instance.searchEmitter.subscribe( () => {

            this.editMode = false;

            let service = new CrudService(this.targetService);

            service.search().then( ( data:any ) => {

                let factory = this.componentFactoryResolver.resolveComponentFactory( SearchComponent );

                let componentRef = this.container.createComponent(factory);

                componentRef.instance.fields = this.getSearchableFields();

                componentRef.instance.dataSource = data;

                componentRef.instance.closeEmitter.subscribe( () => {
                    componentRef.destroy();
                });
            });

        });

        this.populaDados();
    }

    populaDados()
    {

    }

    cancelAction()
    {

    }

    clearForm()
    {

    }

    getSearchableFields() : string[]
    {
        return ["id"];
    }

    enableForm()
    {

    }

    protected sendForm()
    {
        let service = new CrudService(this.targetService);

        service.save(this.form.value);

    }
}