import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'menu-a',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() public onNavOpen = new EventEmitter<boolean>();
  @Input() public menuAlwaysOpened : boolean = false;

  private navOpened : boolean = false;

  private onMouseOver() : void {
    if(this.navOpened || this.menuAlwaysOpened)
      return;

    this.navOpened = true;

    this.onNavOpen.emit(true);
  }

  private onMouseLeave() : void {
    if(!this.navOpened || this.menuAlwaysOpened)
      return;

    this.navOpened = false;

    this.onNavOpen.emit(false);
  }
}