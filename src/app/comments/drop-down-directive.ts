import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    @Output() public clickOutside = new EventEmitter();

    constructor(private _elementRef: ElementRef) {}
    
    @HostListener('document.click', ['$event.target'])
    public onClick(event: MouseEvent) {
        const targetElement = event.target as HTMLElement;

        // const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
        // if (!isClickedInside) {
        //     this.clickOutside.emit(null);
        // }
        if (targetElement && !this._elementRef.nativeElement.contains(targetElement)) {
            this.clickOutside.emit(event);
        }
    }
}