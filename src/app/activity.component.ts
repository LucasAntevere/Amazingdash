import { Component, Input, Optional } from '@angular/core';
import { IActivityComponent } from "./interfaces/activity.component.interface";
import { IDynamicComponentData } from "./dynamic/DynamicComponentData";
import { Subject } from "rxjs/Subject";
import { WindowWrapperComponent } from "./window-wrapper.component";
import { WindowService } from "./service/window-service";
import { FilePickerComponent, FilePickerData } from './file-picker.component';
import { Subscription } from 'rxjs/Subscription';
import { BaseWindow } from './base-window';
import { WindowData } from './service/window-data';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent extends BaseWindow<any, any, any, any> {    
  afterDestroiyng: Subject<any>;  
  page = 1;

  private filePickerSubscription : Subscription;

  constructor(@Optional() window : WindowData<any, any>, private _windowService : WindowService) {    
    super(window, "All products", "Products");
  }

  private onAddFileClick() : void {
    if(!this.filePickerSubscription || this.filePickerSubscription.closed)
      this.openFilePickerWindow();
  }

  private onCancelAddFileClick() : void {
    if(this.filePickerSubscription)
      this.filePickerSubscription.unsubscribe();
  }

  private openFilePickerWindow() : void {
    var filePickerData = new FilePickerData({
      fileType: "test"      
    }, {
      receivedFile: (number : number) => { console.log("ActivityComponent received"); console.log(number); }
    }, { title: "Novo Title", subtitle: "Novo Subtitle" });

    this.filePickerSubscription = this._windowService.open(filePickerData, (data : any) => {
      console.log("ActivityComponent next");
      console.log(data);
    }, (data : any) => {
      console.log("ActivityComponent error");
      console.log(data);
    }, () => {
      console.log("ActivityComponent complete");
    });

    setTimeout(() => { filePickerData.title = "novo title!"; }, 1000);
  }
}