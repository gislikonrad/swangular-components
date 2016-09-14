import { Component, Input } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { TemplateProvider } from '../../services/template.provider';
import { IApiMethodFormComponent } from './api-method-form-control.component';
import { Parameter, Types } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'textarea-control',
  template: TemplateProvider.getTemplate('textarea-control') || `
    <div [formGroup]="form" class="form-group" [class.has-error]="form.controls[parameter.name].invalid && !form.controls[parameter.name].pristine">
      <textarea [formControlName]="parameter.name" [name]="parameter.name" class="form-control"></textarea>
    </div>
  `,
  styles: [
    'textarea { width: 300px; height: 200px;}'
  ]
})

export class TextAreaControlComponent implements IApiMethodFormComponent {
  @Input() form: FormGroup;
  @Input() parameter: Parameter;

  createValidators(): ValidatorFn[] {
    return null;
  }
}
