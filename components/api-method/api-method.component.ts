import { Component, Input, OnInit } from '@angular/core';
import { TemplateProvider } from '../../services/template.provider';
import { Operation, Response } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'api-method',
  template: TemplateProvider.apiMethod,
  styles: [
    'h3 .label { padding-top: 0.4em; }',
    '.panel-heading { cursor: pointer; }'
  ]
})

export class ApiMethodComponent implements OnInit {
  @Input() operation: Operation;
  @Input() verb: string;
  @Input() urlTemplate: string;

  defaultResponseCode: string;
  defaultResponse: Response;
  otherResponses: { [id: string]: Response };

  ngOnInit() {
    this.defaultResponseCode = this.getDefaultResponseCode();
    this.defaultResponse = this.operation.responses[this.defaultResponseCode];
    this.otherResponses = this.getOtherResponses();
  }

  private getOtherResponses(): any {
    let responses: { [id: string] : Response } = {};
    let code = this.getDefaultResponseCode();
    for(let key in this.operation.responses) {
        if(key == code) {
          continue;
        }
        responses[key] = this.operation.responses[key];
    }
    return responses;
  }

  private getDefaultResponseCode(): string {
    let code: string = '1000';
    for(let key in this.operation.responses) {
      if((+code) > (+key)) {
        code = key;
      }
    }
    return code;
  }
}
