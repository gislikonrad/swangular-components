import { Component, Input } from '@angular/core';
import { TemplateProvider } from '../../services/template.provider';
import { Header } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'api-method-response-headers',
  template: TemplateProvider.getTemplate('api-method-response-headers') || `
    <table class="table table-condensed">
      <thead>
        <tr>
          <th>Header</th>
          <th>Description</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let pair of headers | keyValuePairs">
          <td>{{pair.key}}</td>
          <td>{{pair.value.description}}
          <td>{{pair.value.type}}</td>
        </tr>
      </tbody>
    </table>
  `
})

export class ApiMethodResponseHeadersComponent {
  @Input() headers: { [id: string] : Header };
}
