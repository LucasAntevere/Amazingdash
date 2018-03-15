import { Component, Input, Optional, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { IDynamicComponentData } from "./dynamic/DynamicComponentData";
import { Subject } from "rxjs/Subject";
import { WindowData } from './service/window-data';
import { BaseWindow } from './base-window';
import { WindowService } from './service/window-service';

@Component({
  selector: 'file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.css']
})
export class FilePickerComponent extends BaseWindow<number, string, IFilePickerInputs, IFilePickerOutputs> implements IDynamicComponentData, IFilePickerInputs, AfterViewInit {      
  @Input() fileType: string;
  @Output() receivedFile : EventEmitter<number> = new EventEmitter<number>();
  
  afterDestroiyng: Subject<any>;  

  constructor(@Optional() window : WindowData<IFilePickerInputs, IFilePickerOutputs>,
              private _windowService : WindowService) {        
    super(window, "Selecione o arquivo", "Arquivos");
    console.log("Injecting FilePickerComponent");
    console.log(window);

    this._windowService.sendToParent(window.id, { teste: "any data" });    
  }

  ngAfterViewInit(): void {
    
  }

  private onUploadClick() : void{
    this.receivedFile.emit(120);    
    this._windowService.open(new FilePickerData({
      fileType: "Twst"
    },{
      receivedFile: () => {}
    }, null), null, null, null);
  }
}

export interface IWindowInput {
  title : string;
  subtitle : string;
}

export interface IFilePickerInputs {
  fileType : string;
}

export interface IFilePickerOutputs {
  receivedFile : (number : number) => void;
}

export class FilePickerData extends WindowData<IFilePickerInputs, IFilePickerOutputs> {

  constructor(inputs? : IFilePickerInputs, outputs?: IFilePickerOutputs, windowInput? : IWindowInput) {
    super(FilePickerComponent, inputs, outputs, windowInput);
    
  }
}