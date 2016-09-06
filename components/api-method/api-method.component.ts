import { Component, Input, OnInit } from '@angular/core';
import { TemplateProvider } from '../../services/template.provider';
import { RequestBuilder } from '../../services/request.builder';
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
                <h4>Response class <small>Status {{defaultResponseCode}} ({{defaultResponse.description}})</small></h4>
                <api-model [schema]="defaultResponse.schema"></api-model>
                <form>
                  <div class="form-group">
                    <label for="responseContentTypeSelect">Response content type</label>
                    <select class="form-control" id="responseContentTypeSelect" [(ngModel)]="responseContentType" #responseContentTypeSelect="ngModel" name="responseContentTypeSelect">
                      <option *ngFor="let mimeType of operation.produces" [value]="mimeType">{{mimeType}}</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <!-- Security will be here -->
          </div>
        </div>
      </div>
      <ul class="list-group" *ngIf="expanded">
        <li class="list-group-item">
          <api-method-form [parameters]="operation.parameters"
                           [verb]="verb"
                           [urlTemplate]="urlTemplate"
                           [consumes]="operation.consumes"></api-method-form>
        </li>
        <li class="list-group-item">
          <api-method-responses [responses]="otherResponses"></api-method-responses>
        </li>
      </ul>
    </div>
  `,
  styles: [
    'h3 .label { padding-top: 0.4em; }',
    '.panel-heading { cursor: pointer; }',
    '.panel-info .panel-body, .panel-info .list-group-item { background-color: #f3ffff }',
    '.panel-success .panel-body, .panel-success .list-group-item { background-color: #f8fff1 }',
    '.panel-warning .panel-body, .panel-warning .list-group-item { background-color: #fffff0 }',
    '.panel-danger .panel-body, .panel-danger .list-group-item { background-color: #fff8f8 }',
  ],
  providers: [ RequestBuilder ]
})

export class ApiMethodComponent implements OnInit {
  @Input() operation: Operation;
  @Input() verb: string;
  @Input() urlTemplate: string;

  defaultResponseCode: string;
  defaultResponse: Response;
  otherResponses: { [id: string]: Response };

  set responseContentType(value: string) {
    this._builder.responseContentType = value;
  }

  get responseContentType(): string {
    return this._builder.responseContentType;
  }

  constructor(private _builder: RequestBuilder) {}

  ngOnInit() {
    this.defaultResponseCode = this.getDefaultResponseCode();
    this.defaultResponse = this.operation.responses[this.defaultResponseCode];
    this.otherResponses = this.getOtherResponses();
    this._builder.responseContentType = this.operation.produces[0];
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