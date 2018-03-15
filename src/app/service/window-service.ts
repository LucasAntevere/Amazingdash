import { Injectable, Type } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { DynamicComponentData, IDynamicComponentData } from "../dynamic/DynamicComponentData";
import { WindowData } from './window-data';

@Injectable()
export class WindowService {
    public onOpenAnyWindow : Subject<WindowData<any, any>> = new Subject<WindowData<any, any>>();
    public onAfterOpenAnyWindow : Subject<WindowData<any, any>> = new Subject<WindowData<any, any>>();
    public onCloseAnyWindow : Subject<WindowData<any, any>> = new Subject<WindowData<any, any>>();
    
    private windows : WindowData<any, any>[] = [];

    public open(component : WindowData<any, any>,                
                next : (value : any)=> void,
                err : (err : any) => void,
                complete? : () => void) : Subscription {        

        component.id = this.guid();

        component.parentSubject = new Subject<any>();
        component.parentSubscription = component.parentSubject.subscribe(next, err, complete);
        component.parentSubscription.add(() => { this.onUnsubscribe(component); });

        this.windows.push(component);

        this.onOpenAnyWindow.next(component);
        this.onAfterOpenAnyWindow.next(component);

        return component.parentSubscription;
    }

    public close(id : string) : void {   
        var windowIndex = this.windows.findIndex(w => w.id == id);

        for(let i = this.windows.length - 1; i >= windowIndex; i--){
            let w = this.windows[i];
            w.parentSubject.complete();
            this.windows.splice(i, 1)
        }
    }

    private onUnsubscribe(subscription : WindowData<any, any>) : void {        
        var window = this.get(subscription.id);
        
        window.componentRef.destroy();
        
        this.onCloseAnyWindow.next(window);
        console.log("onUnsubscribe");
    }

    public sendErrorToParent(id : string, data : any) : void {
        var window = this.get(id);
        
        window.parentSubject.error(data);
    }

    public sendToParent(id : string, data : any) : void {
        var window = this.get(id);

        window.parentSubject.next(data);
    }

    private get(id : string) : WindowData<any, any> {
        return this.windows.filter(w => w.id == id)[0];
    }

    private guid() : string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
}