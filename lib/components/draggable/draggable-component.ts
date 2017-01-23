
import {Component, ElementRef} from "@angular/core";

declare var __moduleName:any;

@Component({
    moduleId: __moduleName,
    template: '<div (mousedown)="onMouseDown($event)"></div> ',
    selector: 'draggable'
})
export class DraggableComponent
{
    private isDragging:boolean = false;
    private target:HTMLElement;

    private startLeft:number;
    private startTop:number;

    private startMouseEvent:MouseEvent;

    constructor()
    {
        console.debug('DraggableComponent.constructor');

        window.addEventListener("mousemove", e => {
            if ( this.isDragging )
            {
                this.target.style.position = 'absolute';

                this.target.style.left = this.startLeft + ( e.clientX - this.startMouseEvent.clientX) + "px" ;
                this.target.style.top = this.startTop + ( e.clientY - this.startMouseEvent.clientY) + "px" ;
            }
        });

        window.addEventListener("mouseup", () => {
            this.isDragging = false;
            this.target = null;
        });
    }

    onMouseDown(e:MouseEvent)
    {
        this.isDragging = true;
        this.target = <HTMLElement>e.currentTarget;
        this.target = this.target.parentElement.parentElement;

        this.startMouseEvent = e;


        this.startLeft = this.target.offsetLeft;
        this.startTop = this.target.offsetTop;

    }
}
