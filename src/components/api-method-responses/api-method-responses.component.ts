import { Component, Input } from '@angular/core';
import { TemplateProvider } from '../../services/template.provider';
import { Response } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'api-method-responses',
  template: TemplateProvider.apiMethodResponses
})

export class ApiMethodResponsesComponent {
  @Input() responses: { [id: string] : Response };
}
