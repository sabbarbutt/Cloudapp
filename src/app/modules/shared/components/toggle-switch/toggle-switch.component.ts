import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  styleUrls: ['./toggle-switch.style.scss'],
  templateUrl: './toggle-switch.template.html',
})

export class ToggleSwitchComponent {

  private _value: boolean;

  @Output() valueChange = new EventEmitter();

  @Input()
  get value(): boolean{
    return this._value;
  }

  set value(val: boolean){
   this._value = val;
    this.valueChange.emit(val);
  }

  public isOn(): boolean {
    return this.value;
  }

  public toggle(): void {
    if (this.isOn()) {
      this.turnOff();
    } else {
      this.turnOn();
    }
  }

  public turnOn(): void {
    this.value = true;
  }

  public turnOff(): void {
    this.value = false;
  }
}
