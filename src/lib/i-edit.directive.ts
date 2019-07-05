import { AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  HostListener,
  Renderer2,
  ViewChild,
  OnInit } from '@angular/core';

@Directive({
  selector: '[i-edit]'
})
export class IEditDirective {

  @Input() step?: number;
  @Input() placeholder?: string;
  @Input() type?: string;
  @Input() ngModel?: any;
  @Input() options?: any;
  @Input() disabled?: boolean;
  @Input() customclass?: string;
  @Input() valuefield?: string;
  @Output() onsave = new EventEmitter();
  @Output() beforesave = new EventEmitter();
  @Output() ngModelChange = new EventEmitter();
  componentRef = null;
  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.beforesave.emit(this.ngModel);
  }

  @HostListener("click", ["$event"])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.runTypeCheck();
  }
  runTypeCheck() {
    switch (this.type) {
      case "text":
        this.renderInput();
        break;
      case "number":
        this.renderInput();
        break;
      case "email":
        this.renderInput();
        break;
      case "tel":
        this.renderInput();
        break;
      case "textarea":
        this.renderTextArea();
        break;
      case "select":
        this.renderSelect();
        break;
      default:
        this.renderInput();
    }
  }
  renderInput() {
    this.renderer.setStyle(this.viewContainer.element.nativeElement.parentElement, "position", "relative");
    this.renderer.setStyle(this.viewContainer.element.nativeElement, "display", "none");
    this.viewContainer.clear();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextComponent);
    this.componentRef = this.viewContainer.createComponent(componentFactory);
    this.setPosition();
    this.componentRef.instance.customClass = this.iclass;
    this.componentRef.instance.text = this.ngModel;
    this.componentRef.instance.type = this.type;
    this.componentRef.instance.step = this.step;
    this.componentRef.instance.placeholder = this.placeholder;
    this.componentRef.instance.save.subscribe(val => {
      this.ngModelChange.emit(val);
      this.onsave.emit(val);
      this.removeInput();
    });
    this.componentRef.instance.close.subscribe(() => {
      this.removeInput();
    });
  }
  renderTextArea() {
    this.renderer.setStyle(this.viewContainer.element.nativeElement.parentElement, "position", "relative");
    this.renderer.setStyle(this.viewContainer.element.nativeElement, "display", "none");
    this.viewContainer.clear();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextareaComponent);
    this.componentRef = this.viewContainer.createComponent(componentFactory);
    this.setPosition();
    this.componentRef.instance.customClass = this.iclass;
    this.componentRef.instance.text = this.ngModel;
    this.componentRef.instance.type = this.type;
    this.componentRef.instance.save.subscribe(val => {
      this.ngModelChange.emit(val);
      this.onsave.emit(val);
      this.removeInput();
    });
    this.componentRef.instance.close.subscribe(() => {
      this.removeInput();
    });
  }
  renderSelect() {
    this.renderer.setStyle(this.viewContainer.element.nativeElement.parentElement, "position", "relative");
    this.renderer.setStyle(this.viewContainer.element.nativeElement, "display", "none");

    this.viewContainer.clear();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(SelectComponent);
    this.componentRef = this.viewContainer.createComponent(componentFactory);
    this.setPosition();
    this.componentRef.instance.customClass = this.iclass;
    this.componentRef.instance.text = this.ngModel;
    this.componentRef.instance.options = this.options;
    this.componentRef.instance.valuefield = this.valuefield;
    this.componentRef.instance.save.subscribe(val => {
      this.ngModelChange.emit(val);
      this.onsave.emit(val);
      this.removeInput();
    });
    this.componentRef.instance.close.subscribe(() => {
      this.removeInput();
    });
  }
  setPosition() {
    let height = this.viewContainer.element.nativeElement.offsetHeight;
    let elm = <HTMLElement>document.querySelector(".i-edit-container");
    elm.setAttribute("style", "top:" + parseInt(height) + "px");
    let rect = elm.getBoundingClientRect();
    let l = rect.left;
    let w = rect.width;
    let docH = document.getElementsByTagName("body")[0].offsetHeight;
    let docW = document.getElementsByTagName("body")[0].offsetWidth;
    let isEntirelyVisible = l + w <= docW;

    if (!isEntirelyVisible) {
      elm.setAttribute("style", "right:" + "15px; left:auto;");
    } else {
      elm.setAttribute("style", "left:" + "15px; right:auto;");
    }
  }
  removeInput() {
    this.componentRef.destroy();
    this.renderer.removeStyle(this.viewContainer.element.nativeElement, "display");
  }
  @HostListener("document:click", ["$event.target"])
  public onClick(targetElement) {
    if (this.componentRef) {
      const clickedDp = this.componentRef.location.nativeElement.contains(targetElement);
      const clickedInput = this.viewContainer.element.nativeElement == targetElement;
      if (!clickedDp && !clickedInput) {
        if (this.componentRef) {
          this.renderer.setStyle(this.viewContainer.element.nativeElement, "display", "inline-block");
          this.componentRef.destroy();
        }
      }
    }
  }

}
