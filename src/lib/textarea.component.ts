import { Component, OnInit, ElementRef, EventEmitter, Input, HostListener } from "@angular/core";

@Component({
  selector: 'lib-textarea',
  template: `
  <div class="i-edit-container form-group">
  <textarea [class]="customClass" [(ngModel)]="text"></textarea>
  <div>
    <span class="cancel" (click)="cancel()">&#10005;</span><span class="save" (click)="submit()">&#10003;</span>
  </div>
</div>
  `,
  styles: [".i-edit-container{z-index:10;display:block;white-space:nowrap;margin:0;width:100%;min-width:200px;position:absolute;background:#fff}.i-edit-container .save{margin-top:5px;color:#000;float:right;font-weight:800;font-size:1em;border:1px solid #aaa;padding:0 7px;cursor:pointer;margin-right:5px}.i-edit-container .cancel{margin-top:5px;color:#000;float:right;font-weight:800;font-size:1em;border:1px solid #aaa;padding:0 7px;cursor:pointer}"]
})
export class TextareaComponent implements OnInit {

  @Input() customClass?: string;
  @Input() text?: any;
  @Input() placeholder?: string;
  close = new EventEmitter();
  save = new EventEmitter();
  tmpText: any;
  constructor() {}

  ngOnInit() {
    this.tmpText = Object.assign(this.text);
    let elm = <HTMLElement>document.querySelector("textarea");
    elm.focus();
  }
  submit() {
    if (this.tmpText == this.text) {
      this.close.emit();
    } else {
      this.save.emit(this.text);
    }
  }
  cancel() {
    this.close.emit();
  }

}
