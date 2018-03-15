import { OnDestroy } from "@angular/core";
import { WindowData } from "./service/window-data";

export class BaseWindow<TReturn, TUnsuccessfully, TInput, TOutput> implements OnDestroy {
    protected _window : WindowData<TInput, TOutput>;
    
    constructor(window : WindowData<TInput, TOutput>, title : string, subtitle : string) {
        if(window == null){
            this._window = new WindowData<TInput, TOutput>(null);
            this._window.title = title;
            this._window.subtitle = subtitle;
        } else
            this._window = window;
    }

    protected get id() : string {
        return this._window.id;
    }

    ngOnDestroy(): void {
        
    }
}