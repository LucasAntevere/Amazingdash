import { Component, Input } from '@angular/core';
import { IDynamicComponentData } from "./dynamic/DynamicComponentData";
import { Subject } from "rxjs/Subject";
import { WindowService } from './service/window-service';

@Component({
  selector: 'window-wrapper',
  templateUrl: './window-wrapper.component.html',
  styleUrls: ['./window-wrapper.component.css']
})
export class WindowWrapperComponent {
  @Input() private id : string;
  @Input() private title : string;
  @Input() private subtitle : string;

  constructor(private _windowService : WindowService){
    
  }

  private onClose() : void {        
    this._windowService.close(this.id);
  }
}