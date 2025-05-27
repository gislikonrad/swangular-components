import { Component, OnInit, Input } from '@angular/core';
import { IApiMethodFormComponent } from "../method-form-control/method-form-control.component";
import { AbstractControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
type Parameter = OpenAPIV2.Parameter | OpenAPIV3.ParameterObject | OpenAPIV3_1.ParameterObject;

@Component({
  selector: 'api-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit, IApiMethodFormComponent {
  @Input() form: FormGroup;
  @Input() parameter: Parameter;

  type: string;

  createValidators(): ValidatorFn[] {
    let validators: ValidatorFn[] = [];
    if('minLength' in this.parameter) {
      validators.push(Validators.minLength(this.parameter.minLength));
    }
    if('maxLength' in this.parameter) {
      validators.push(Validators.maxLength(this.parameter.maxLength));
    }
    if('maximum' in this.parameter) {
      validators.push(this.createMaxValueValidator(this.parameter.maximum, this.parameter.exclusiveMaximum));
    }
    if('minimum' in this.parameter) {
      validators.push(this.createMinValueValidator(this.parameter.minimum, this.parameter.exclusiveMinimum));
    }
    if('pattern' in this.parameter) {
      validators.push(Validators.pattern(this.parameter.pattern));
    }
    return validators;
  }

  ngOnInit() {
    if('type' in this.parameter && (this.parameter.type == 'number' || this.parameter.type == 'integer')) {
      this.type = 'number';
    }
    else {
      this.type = 'string';
    }
  }

  private createMaxValueValidator(maximum: number, exclusiveMaximum: boolean): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (this.isPresent(Validators.required(control))) return null;
      var v: number = parseInt(control.value);
      if(isNaN(v)) return null;

      let valid: boolean;
      if(exclusiveMaximum) {
        valid = (v < maximum);
      }
      else {
        valid = (v <= maximum)
      }
      return !valid ? {
        "maximum": {
          "maximumValue": (exclusiveMaximum ? maximum - 1: maximum),
          "actualValue": v
        }
      } : null;
    };
  }

  private createMinValueValidator(minimum: number, exclusiveMinimum: boolean): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (this.isPresent(Validators.required(control))) return null;
      var v: number = parseInt(control.value);
      if(isNaN(v)) return null;

      let valid: boolean;
      if(exclusiveMinimum) {
        valid = (v > minimum);
      }
      else {
        valid = (v >= minimum)
      }
      return !valid ? {
        "minimum": {
          "minimumValue": (exclusiveMinimum ? minimum + 1 : minimum),
          "actualValue": v
        }
      } : null;
    };
  }

  private isPresent(value: any): boolean {
    return value !== undefined && value !== null;
  }

}
