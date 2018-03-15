import { Type } from "@angular/core/src/type";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { OnDestroy, ComponentRef } from "@angular/core/core";

export class DynamicComponentData {
    constructor(component : Type<any>,
                data : IDynamicComponentData){
                    this.component = component;
                    this.data = data;
                }

  public component : Type<any>;
  public data : IDynamicComponentData;
  public componentRef : ComponentRef<any>;
}

export interface IDynamicComponentData {    
    afterDestroiyng: Subject<any>;
}