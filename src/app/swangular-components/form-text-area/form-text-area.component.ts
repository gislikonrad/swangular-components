import { Component, OnInit, Input } from '@angular/core';
import { IApiMethodFormComponent } from "../method-form-control/method-form-control.component";
import { FormGroup, ValidatorFn } from "@angular/forms";
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
type Parameter = OpenAPIV2.Parameter | OpenAPIV3.ParameterObject | OpenAPIV3_1.ParameterObject;

@Component({
  selector: 'api-form-text-area',
  templateUrl: './form-text-area.component.html',
  styleUrls: ['./form-text-area.component.css']
})
export class FormTextAreaComponent implements OnInit, IApiMethodFormComponent {
  @Input() form: FormGroup;
  @Input() parameter: Parameter;

  constructor(){}

  createValidators(): ValidatorFn[] {
    return null;
  }

  ngOnInit() {
  }
}
