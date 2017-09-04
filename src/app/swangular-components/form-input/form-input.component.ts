import { Component, OnInit, Input } from '@angular/core';
import { IApiMethodFormComponent } from "../method-form-control/method-form-control.component";
import { AbstractControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Parameter, Type } from "swagger-schema-ts";

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
    if(this.isPresent(this.parameter.minLength)) {
      validators.push(Validators.minLength(this.parameter.minLength));
    }
    if(this.isPresent(this.parameter.maxLength)) {
      validators.push(Validators.maxLength(this.parameter.maxLength));
    }
    if(this.isPresent(this.parameter.maximum)) {
      validators.push(this.createMaxValueValidator(this.parameter.maximum, this.parameter.exclusiveMaximum));
    }
    if(this.isPresent(this.parameter.minimum)) {
      validators.push(this.createMinValueValidator(this.parameter.minimum, this.parameter.exclusiveMinimum));
    }
    if(this.isPresent(this.parameter.pattern)) {
      validators.push(Validators.pattern(this.parameter.pattern));
    }
    return validators;
  }

  ngOnInit() {
    if(this.parameter.type == Type.number || this.parameter.type == Type.integer) {
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
