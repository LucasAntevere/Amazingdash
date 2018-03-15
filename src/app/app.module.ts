import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { MenuComponent } from './menu.component';
import { WindowComponent } from './window.component';
import { ActivityComponent } from './activity.component'
import { WindowWrapperComponent } from './window-wrapper.component';
import { DynamicComponent } from './dynamic.component';
import { WindowService } from "./service/window-service";
import { FilePickerComponent } from "./file-picker.component";

import { DynamicWindowDirective } from './directives/dynamic-window.directive';

const appRoutes: Routes = [
  { path: 'home', component: ActivityComponent, outlet: 'primary' }  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    WindowComponent,
    ActivityComponent,    
    WindowWrapperComponent,
    DynamicWindowDirective,
    DynamicComponent,
    FilePickerComponent    
  ],
  // NOTE: Add here all dynamic components.
  entryComponents: [
    FilePickerComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
