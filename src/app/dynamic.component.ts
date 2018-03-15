import { Component, Input, Type, AfterViewInit, ViewChild, ComponentFactoryResolver, ReflectiveInjector, ReflectiveKey } from '@angular/core';
import { DynamicWindowDirective } from "./directives/dynamic-window.directive";
import { Observable } from "rxjs/Observable";
import { DynamicComponentData } from "./dynamic/DynamicComponentData";
import { WindowData } from './service/window-data';

@Component({
  selector: 'dynamic',
  templateUrl: './dynamic.component.html'
})
export class DynamicComponent implements AfterViewInit {    
    @Input("component") componentData: WindowData<any, any>;    
    
    @ViewChild(DynamicWindowDirective) dynamicWindow: DynamicWindowDirective;

    constructor(private componentFactoryResolver : ComponentFactoryResolver) {}

    ngAfterViewInit(): void {        
        this.loadComponent();                
    }

    private loadComponent() : void {           
        this.dynamicWindow.viewContainerRef.clear();
        
        var factory = this.componentFactoryResolver.resolveComponentFactory(this.componentData.component);
        
        var window = ReflectiveInjector.resolve([{ provide: WindowData, useValue: this.componentData }]);
        
        var injector = ReflectiveInjector.fromResolvedProviders(window, this.dynamicWindow.viewContainerRef.parentInjector);

        var component = factory.create(injector);
        
        for(let i = 0; i < factory.inputs.length; i++){
            let input = factory.inputs[i];
            if(input.templateName)
                component.instance[input.templateName] = this.componentData.inputs[input.templateName];
            else
                component.instance[input.propName] = this.componentData.inputs[input.propName];
        }
        
        for(let i = 0; i < factory.outputs.length; i++){
            let output = factory.outputs[i];
            if(output.templateName)
                component.instance[output.templateName].subscribe(this.componentData.outputs[output.templateName]);
            else
                component.instance[output.propName].subscribe(this.componentData.outputs[output.propName]);
        }
        
        component.changeDetectorRef.detectChanges();

        var componentRef = this.dynamicWindow.viewContainerRef.insert(component.hostView);
        
        this.componentData.componentRef = component;
    }
}