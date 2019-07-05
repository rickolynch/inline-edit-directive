# Inline Edit Directive

Inline Edit Directive

## Description

Inline edit available via directive. Supports inputs(text, tel, email, number), textarea and select. Compatible with Angular2+

## Installation

*npm i inline-edit-directive*

## Basic Usage

### 1. Add *InlineEditModule* import to your *@NgModule* like example below
``` typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyTestApp } from './my-test-app';
import { InlineEditModule } from 'date-picker-directive';

@NgModule({
    imports:      [ BrowserModule, InlineEditModule ],
    declarations: [ MyTestApp ],
    bootstrap:    [ MyTestApp ]
})
export class MyTestAppModule {}
```
### 2. Add the directive and additional options to your HTML element
``` html
<span i-edit type="text" placeholder="Input Date" [(ngModel)]="myVar" (onsave)="itemSaved($event)" ></span>
```
### 3. Provide method for date selected event
``` typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myVar = 'sample text';
  dateval: string = null;
  itemSaved(val) {
    // do something
  }
}
```
*NB* If ngModel is used with 2 way binding *[(ngModel)]*, the variable is automatically updated.

## Attributes
The following options are available for the directive


| Option        | Optional    | Type  | Description |
| ------------- | ------------- | ----- | ----- |
| type | required | string | Tells the directive what input type to use. Types include: *text, number, email, tel, select, textarea* |
| ngModel | optional | any | Model with data or to be updated. Can be used with angular binding techniques|
| placeholder | optional | string | Temporary message shown in input |
| customclass | optional | string | Apply your custom class or bootstrap classes to the input elements |
| options | required if *type="select" | array | Sends list of items to be used in select list. |
| valuefield | optional | string | Used with select list if a list of objects is used to determine which property to display |

## Events

### beforesave

This event is triggered when the element is clicked and before editing starts. Can be used to do checks or validation before changes are made. The initial data sent via ngModel is returned in the event.

### onsave

This event is triggered when editing is complete via:enter key pressed, item selected in select list, or save button pressed on textarea. The changes made/value selected is returned in this event. If 2 way binding is used on the ngModel *[(ngModel)]* the variable would already be updated.

## Author
* Author: Ricardo Lynch

## License
This project is licensed under the MIT License 

# Keywords
* inline edit
* inline
* x edit
* angular4
* typescript
* directive
* ngx inline
* ng
* ng4