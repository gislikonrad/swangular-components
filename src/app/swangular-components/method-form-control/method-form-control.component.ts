import { Component, OnInit, Input, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, ValidatorFn, Validators, FormControl } from "@angular/forms";
import { Parameter, Type } from "swagger-schema-ts";
import { FormInputComponent } from "../form-input/form-input.component";
import { FormSelectComponent } from "../form-select/form-select.component";
import { FormTextAreaComponent } from "../form-text-area/form-text-area.component";

@Component({
  selector: 'api-method-form-control',
  templateUrl: './method-form-control.component.html',
  styleUrls: ['./method-form-control.component.css']
})
export class MethodFormControlComponent implements OnInit, OnDestroy {
  initialized: boolean;

  @Input() form: FormGroup;
  @Input() parameter: Parameter;

  private _ref: ComponentRef<IApiMethodFormComponent>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _container: ViewContainerRef) {
  }

  ngOnInit() {
    let component: any;
    let factory: ComponentFactory<IApiMethodFormComponent>;
    if(this.parameter.schema) {
      factory = this._componentFactoryResolver.resolveComponentFactory(FormTextAreaComponent);
    }
    else if(this.parameter.type == Type.string && this.parameter.enum || this.parameter.type == Type.boolean) {
      factory = this._componentFactoryResolver.resolveComponentFactory(FormSelectComponent);
    }
    else {
      factory = this._componentFactoryResolver.resolveComponentFactory(FormInputComponent);
    }
    
    this._ref = this._container.createComponent(factory);    
    this._ref.instance.parameter = this.parameter;
    this._ref.instance.form = this.form;

    this.initializeValidators(this._ref.instance);

    this.initialized = true;
  }

  ngOnDestroy() {
    if(this._ref) {
      this._ref.destroy();
    }
  }

  private initializeValidators(component: IApiMethodFormComponent) {
    let control = <FormControl>this.form.controls[this.parameter.name];
    let validators: ValidatorFn[] = component.createValidators() || [];
    if(this.parameter.required) {
      validators.push(Validators.required);
    }

    control.setValidators(Validators.compose(validators));
  }

}

export interface IApiMethodFormComponent {
  form: FormGroup;
  parameter: Parameter;
  createValidators(): ValidatorFn[];
}