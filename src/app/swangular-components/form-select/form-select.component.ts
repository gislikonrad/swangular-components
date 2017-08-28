import { Component, OnInit, Input } from '@angular/core';
import { IApiMethodFormComponent } from "../method-form-control/method-form-control.component";
import { Types, Parameter } from "swagger-schema-ts";
import { FormGroup, FormControl, ValidatorFn } from "@angular/forms";

@Component({
  selector: 'api-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent implements OnInit, IApiMethodFormComponent {
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
