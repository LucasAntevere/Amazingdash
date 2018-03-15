import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header-a',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private _menuIsToggled : boolean = false;

  @Output() private onMenuToggleChange : EventEmitter<boolean> = new EventEmitter<boolean>();

  private set menuIsToggled(value : boolean){
    this._menuIsToggled = value;

    this.onMenuToggleChange.emit(this._menuIsToggled);
  }

  private onMenuToggleClick() : void {
    this.menuIsToggled = !this._menuIsToggled;
  }
}