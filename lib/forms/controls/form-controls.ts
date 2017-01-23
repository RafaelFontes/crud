import {Component, Output, EventEmitter} from "@angular/core";

declare var __moduleName:any;

@Component({
    moduleId: __moduleName,
    selector: 'form-controls',
    templateUrl: 'controls.html',
    styleUrls:  ['controls.css'],
    providers: []
})
export class FormControlsComponent {

    @Output("exit") exitEmitter:EventEmitter<void> = new EventEmitter<void>();
    @Output("save") saveEmitter:EventEmitter<void> = new EventEmitter<void>();
    @Output("new")  newEmitter:EventEmitter<void> = new EventEmitter<void>();
    @Output("cancel")  cancelEmitter:EventEmitter<void> = new EventEmitter<void>();
    @Output("change")  changeEmitter:EventEmitter<void> = new EventEmitter<void>();
    @Output("remove")  removeEmitter:EventEmitter<void> = new EventEmitter<void>();

    changingMode: boolean = false;
    newRegistry: boolean = false;
    containsRegistry: boolean = false;

    constructor() {
        console.debug("FormControls.constructor");
    }

    onChangeMenuClicked()
    {
        this.changingMode = true;
        this.newRegistry = false;
        this.changeEmitter.emit();
    }

    onNewMenuClicked() {
        this.changingMode = true;
        this.newRegistry = true;

        this.newEmitter.emit();
    }

    onCancelMenuClicked()
    {
        this.changingMode = false;
        this.newRegistry = false;

        this.cancelEmitter.emit();
    }

    onRemoveMenuClicked()
    {
        this.removeEmitter.emit();
        this.cancelEmitter.emit();
    }

    onLeaveMenuClicked()
    {
        this.exitEmitter.emit();
    }

    onSaveMenuClicked()
    {
        this.containsRegistry = true;
        this.saveEmitter.emit();
        this.cancelEmitter.emit();
    }
}
