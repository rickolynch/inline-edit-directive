import { NgModule } from "@angular/core";
import { IEditDirective } from "./i-edit.directive";
import { TextareaComponent } from "./textarea.component";
import { InputComponent } from "./input.component";
import { SelectComponent } from "./select.component";

@NgModule({
  declarations: [InputComponent, IEditDirective, TextareaComponent, SelectComponent],
  imports: [],
  exports: [InputComponent, , TextareaComponent, SelectComponent],
  entryComponents: [InputComponent, TextareaComponent, SelectComponent]
})
export class InlineEditModule {}
