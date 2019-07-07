import { NgModule } from "@angular/core";
import { IEditDirective } from "./i-edit.directive";
import { TextareaComponent } from "./textarea.component";
import { InputComponent } from "./input.component";
import { SelectComponent } from "./select.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [InputComponent, IEditDirective, TextareaComponent, SelectComponent],
  imports: [FormsModule, CommonModule],
  exports: [InputComponent, IEditDirective, TextareaComponent, SelectComponent],
  entryComponents: [InputComponent, TextareaComponent, SelectComponent]
})
export class InlineEditModule {}
