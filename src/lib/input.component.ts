import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-input',
  template: `<div class="i-edit-container form-group"><input [type]="type||\'text\'"[attr.step]="step ? step : null" [(ngModel)]="text" [class]="customClass" [attr.placeholder]="placeholder ? placeholder : \'Enter Value\'" (keyup.enter)="submit()"/></div>`,
  styles: [".i-edit-container{z-index:10;display:block;white-space:nowrap;margin:0;width:100%;min-width:200px;top:0;position:absolute;background:#fff}"]
})

export class InputComponent implements OnInit {

  @Input() customClass?: string;
  @Input() text?: any;
  @Input() type?: string;
  @Input() step?: number;
  @Input() placeholder?: string;
  close = new EventEmitter();
  save = new EventEmitter();
  tmpText: any;
  constructor() {}

  ngOnInit() {
    this.tmpText = this.text ? Object.assign(this.text) : null;
    let elm = <HTMLElement>document.querySelector("input");
    elm.focus();
  }
  submit() {
    if (this.tmpText == this.text) {
      this.close.emit();
    } else {
      this.save.emit(this.text);
    }
  }

}
