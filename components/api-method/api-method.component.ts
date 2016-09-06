import { Component, Input, OnInit } from '@angular/core';
import { TemplateProvider } from '../../services/template.provider';
import { Operation, Response } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'api-method',
  template: TemplateProvider.getTemplate('api-method') || `
    <div class="panel"
        [class.panel-info]="verb == 'get'"
        [class.panel-success]="verb == 'post'"
        [class.panel-warning]="verb == 'put' || verb == 'patch'"
        [class.panel-danger]="verb == 'delete'">
      <div class="panel-heading" (click)="expanded = !expanded">
        <h3 class="panel-title">
          <span class="label text-uppercase"
               [class.label-info]="verb == 'get'"
               [class.label-success]="verb == 'post'"
               [class.label-warning]="verb == 'put' || verb == 'patch'"
               [class.label-danger]="verb == 'delete'">{{verb}}</span> {{urlTemplate}}
          <span class="pull-right">{{operation.summary}}</span>
        </h3>
      </div>
      <div class="panel-body" *ngIf="expanded">
        <div class="row">
          <div class="col-md-10">
            <div *ngIf="operation.description">
              <h4>Implementation notes</h4>
              <p [innerHtml]="operation.description"></p>
            </div>
            <div class="row">
              <div class="col-md-6">
                <h4>Response class (Status {{defaultResponseCode}})</h4>
                <div #responseWrapper="var" [var]="defaultResponse">
                  <api-model [schema]="responseWrapper.var.schema"></api-model>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            Security will be here
          </div>
        </div>
        <api-method-responses [responses]="otherResponses"></api-method-responses>
      </div>
    </div>
  `,
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
