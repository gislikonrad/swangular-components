import { Component, Input } from '@angular/core';
import { TemplateProvider } from '../../services/template.provider';
import { Schema } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'api-model',
  template: TemplateProvider.apiModel
})

export class ApiModelComponent {
  @Input() schema: Schema;
}
