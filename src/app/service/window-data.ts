import { DynamicComponentData } from "../dynamic/DynamicComponentData";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { Type, ComponentRef } from "@angular/core";
import { IWindowInput } from "../file-picker.component";

export class WindowData<TInput, TOutput> implements IWindowInput {
    constructor(component : Type<any>, inputs?: TInput, outputs?: TOutput, windowInput? : IWindowInput){
        this.component = component;
        this.inputs = inputs;
        this.outputs = outputs;

        if(windowInput)
            for(let property in windowInput)
                this[property] = windowInput[property];
    }

    public id : string;

    public title : string;
    public subtitle : string;

    public component : Type<any>;
    public componentRef : ComponentRef<any>;

    public parentSubject : Subject<any>;
    public parentSubscription : Subscription;

    public inputs : TInput;
    public outputs : TOutput;

    public CloseSubject : Subject<any>;
}