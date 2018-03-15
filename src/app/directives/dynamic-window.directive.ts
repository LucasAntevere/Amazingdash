import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamic-window]',
})
export class DynamicWindowDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}