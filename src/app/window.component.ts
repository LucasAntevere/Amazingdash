import { Component, ViewChild, ComponentFactoryResolver, OnDestroy, AfterViewInit, QueryList, Type } from '@angular/core';
import { DynamicWindowDirective } from './directives/dynamic-window.directive';
import { DynamicComponentData, IDynamicComponentData } from "./dynamic/DynamicComponentData";
import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";
import { WindowService } from "./service/window-service";
import { WindowData } from './service/window-data';

@Component({
  selector: 'window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements AfterViewInit {    
    private components : WindowData<any, any>[] = [];

    constructor(private router : Router,
                private _windowService : WindowService) {

    }

    ngAfterViewInit(): void {   
      this._windowService.onOpenAnyWindow.subscribe(this.openWindow.bind(this));
      this._windowService.onCloseAnyWindow.subscribe(this.closeWindow.bind(this));
    }

    private openWindow(component : WindowData<any, any>) : void {
      this.components.push(component);
    }

    private closeWindow(component : WindowData<any, any>) : void {   
      if(this.components.length > 0) {
        this.components.splice(this.components.findIndex(w => w == component), 1)                
      } else {
        this.router.navigate(['/']);
      }
      console.log("closeWindow");
    }
}