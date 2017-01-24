import {Component, Output, EventEmitter, ChangeDetectorRef} from "@angular/core";

declare var __moduleName:any;

@Component
({
    moduleId: __moduleName,
    selector: 'search-component',
    templateUrl: 'search-component.html',
    styleUrls: ['search-component.css']
})
export class SearchComponent
{
    private arrayData:any[] = [];
    private _fields:string[] = [];

    @Output("close") closeEmitter:EventEmitter<void> = new EventEmitter<void>();

    constructor( private changeDetector:ChangeDetectorRef )
    {
        console.debug("SearchComponent.constructor");
    }

    set dataSource ( data:any[] )
    {
        this.arrayData.splice.apply(this.arrayData, [0,this.arrayData.length].concat( data ) );
        this.changeDetector.detectChanges();
    }

    set fields (fields:string[])
    {
        console.log("asdf",fields);
        this._fields = fields;
        this.changeDetector.detectChanges();
    }

    get fields() : string[]
    {
        return this._fields;
    }

    get rows() : any[]
    {
        return this.arrayData;
    }

    exit()
    {
        this.closeEmitter.emit();
    }
}