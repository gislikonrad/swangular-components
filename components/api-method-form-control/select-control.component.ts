import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl,ValidatorFn } from '@angular/forms';
import { TemplateProvider } from '../../services/template.provider';
import { IApiMethodFormComponent } from './api-method-form-control.component';
import { Parameter, Types } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'select-control',
  template: TemplateProvider.getTemplate('select-control') || `
    <div class="form-group" [formGroup]="form" [class.has-error]="form.controls[parameter.name].invalid && !form.controls[parameter.name].pristine">
      <select [formControlName]="parameter.name" [name]="parameter.name" class="form-control">
        <option *ngIf="!parameter.required" value=''></option>
        <option *ngFor="let value of enum" [value]="value">{{value}}</option>
      </select>
    </div>
  `,
  styles: [
    'select { width: 300px}'
  ]
})

export class SelectControlComponent implements OnInit, IApiMethodFormComponent {
  @Input() form: FormGroup;
  @Input() parameter: Parameter;

  ngOnInit() {
    if(this.parameter.required) {
      let control = <FormControl>this.form.controls[this.parameter.name];
      control.setValue(this.enum[0]);
    }
  }

  createValidators(): ValidatorFn[] {
    return null;
  }

  get enum(): string[] {
    if(this.parameter.enum) {
      return this.parameter.enum;
    }
    if(this.parameter.type == Types.boolean) {
      return [ 'false', 'true' ];
    }
    return [];
  }
}
