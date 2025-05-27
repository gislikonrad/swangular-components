import { Component, OnInit, Input } from '@angular/core';
import { IApiMethodFormComponent } from "../method-form-control/method-form-control.component";
import { FormGroup, FormControl, ValidatorFn } from "@angular/forms";
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
type Parameter = OpenAPIV2.Parameter | OpenAPIV3.ParameterObject | OpenAPIV3_1.ParameterObject;

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
    if ('schema' in this.parameter) {
      throw new Error("FormSelectComponent does not support schema");
    }

    if ('enum' in this.parameter) 
      return this.parameter.enum;
    if ('type' in this.parameter && this.parameter.type == 'boolean') {      
      return [ 'false', 'true' ];
    }
    return [];
  }
}
