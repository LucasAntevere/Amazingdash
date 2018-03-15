import { Component, ViewChild, ElementRef } from '@angular/core';
import { WindowService } from './service/window-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("page") page : ElementRef;

  title = 'app';

  private navOpened : boolean = false;
  private _menuMustBeAlwaysOpened : boolean = false;

  constructor(private _windowService : WindowService){
    _windowService.onAfterOpenAnyWindow.subscribe(() => {
      
      console.log(this.page);
      console.log(this.page.nativeElement.scrollTop);      
      this.page.nativeElement.scrollTop = this.page.nativeElement.width;
    });
  }

  private onNavToggle(opened: boolean) : void{
    this.navOpened = opened;
  }

  private onMenuToggleChange(menuMustBeAlwaysOpened: boolean) : void {
    this._menuMustBeAlwaysOpened = menuMustBeAlwaysOpened;
  }
}