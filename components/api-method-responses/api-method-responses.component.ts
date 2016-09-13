import { Component, Input } from '@angular/core';
import { TemplateProvider } from '../../services/template.provider';
import { Response } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'api-method-responses',
  template: TemplateProvider.getTemplate('api-method-responses') || `
    <table class="table table-condensed">
      <thead>
        <tr>
          <th>HTTP Status Code</th>
          <th>Reason</th>
          <th>Response model</th>
          <th>Headers</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let pair of responses | keyValuePairs"
            [class.info]="(+pair.key) < 300 && (+pair.key) >= 200"
            [class.success]="(+pair.key) < 400 && (+pair.key) >= 300"
            [class.warning]="(+pair.key) < 500 && (+pair.key) >= 400"
            [class.danger]="(+pair.key) >= 500">
          <td>{{pair.key}}</td>
          <td>{{pair.value.description}}
          <td><api-model [schema]="pair.value.schema"></api-model></td>
          <td>&nbsp;</td>
        </tr>
      </tbody>
    </table>
  `
})

export class ApiMethodResponsesComponent {
  @Input() responses: { [id: string] : Response };
}
