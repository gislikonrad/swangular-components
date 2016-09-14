import { Component, Input, OnInit, OnDestroy, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { FormGroup,FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Parameter, Types } from '../../schema/2.0/swagger.schema';
import { InputControlComponent } from './input-control.component';
import { SelectControlComponent} from './select-control.component';
import { TextAreaControlComponent } from './textarea-control.component';

@Component({
  selector: 'api-method-form-control',
  template: ''
})

export class ApiMethodFormControlComponent implements OnInit, OnDestroy {
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
      factory = this._componentFactoryResolver.resolveComponentFactory(TextAreaControlComponent);
    }
    else if(this.parameter.type == Types.string && this.parameter.enum || this.parameter.type == Types.boolean) {
      factory = this._componentFactoryResolver.resolveComponentFactory(SelectControlComponent);
    }
    else {
      factory = this._componentFactoryResolver.resolveComponentFactory(InputControlComponent);
    }
    this._ref = this._container.createComponent(factory);
    this._ref.instance.parameter = this.parameter;
    this._ref.instance.form = this.form;

    this.initializeValidators(this._ref.instance);
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

export const FORM_CONTROLS: any[] = [
  InputControlComponent,
  SelectControlComponent,
  TextAreaControlComponent
];
