import { Component, OnInit, Input, EventEmitter } from "@angular/core";

@Component({
  selector: 'lib-select',
  template: `
  <div class="i-edit-container form-group">
  <select [class]="customClass">
    <option value="" *ngIf="placeholder">{{ placeholder }}</option>
    <option *ngFor="let opt of options" (click)="submit(opt)">{{ valuefield ? opt[valuefield] : opt }}</option>
  </select>
</div>
  `,
  styles: [".i-edit-container{z-index:10;display:block;white-space:nowrap;margin:0;width:100%;min-width:200px;top:0;position:absolute;background:#fff}"]
})
export class SelectComponent implements OnInit {
  @Input() customClass?: string;
  @Input() text?: any;
  @Input() options?: any;
  @Input() placeholder?: string;
  @Input() valuefield?: any;
  close = new EventEmitter();
  save = new EventEmitter();
  tmpText: any;
  constructor() {}

  ngOnInit() {
    this.tmpText = this.text ? Object.assign(this.text) : null;
    let elm = <HTMLElement>document.querySelector("select");
    elm.focus();
  }
  submit(val) {
    if (this.tmpText == this.text) {
      this.close.emit();
    } else {
      this.save.emit(val);
    }
  }

}
