export class TemplateProvider {
  static apiSwagger: string = `
    <div *ngIf="swagger">
      <h2>{{swagger.info.title}} <small>on https://{{swagger.host + (swagger.basePath || '')}}</small></h2>
      <p>{{swagger.info.description}}</p>
      <div *ngFor="let pair of swagger.paths | keyValuePairs">
        <h3>{{pair.key}}</h3>
        <api-method *ngFor="let path of pair.value | keyValuePairs"
          [operation]="path.value"
          [verb]="path.key"
          [urlTemplate]="pair.key"></api-method>
      </div>
      <pre>{{swaggerJson}}</pre>
    </div>
  `;

  static apiMethod: string = `
    <div class="panel"
        [class.panel-info]="verb == 'get'"
        [class.panel-success]="verb == 'post'"
        [class.panel-warning]="verb == 'put' || verb == 'patch'"
        [class.panel-danger]="verb == 'delete'">
      <div class="panel-heading" (click)="expanded = !expanded">
        <h3 class="panel-title">
          <span class="label text-uppercase" [class.label-info]="verb == 'get'" [class.label-success]="verb == 'post'">{{verb}}</span> {{urlTemplate}}
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
  `;

  static apiMethodResponses: string = `
    <div>
      <h4>Responses</h4>
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
    </div>
  `;

  static apiModel: string = `
    <div class="btn-group">
      <button type="button" class="btn btn-default btn-xs" (click)="showModelSchema=false" [class.active]="!showModelSchema">Model</button>
      <button type="button" class="btn btn-default btn-xs" (click)="showModelSchema=true" [class.active]="showModelSchema">Model Schema</button>
    </div>
    <pre *ngIf="!showModelSchema">{{ displayModelExample(schema) }}</pre>
    <div *ngIf="showModelSchema">
      <p *ngFor="let ref of refs" #s="var" [var]="getSchemaAndName(ref)" >
        <small>
          <strong>{{s.var.name}} {{ '{' }}</strong><br />
            <span *ngFor="let p of (s.var.schema.properties || {}) | keyValuePairs">
              <span>
              &nbsp;&nbsp;
              <strong>{{p.key}}</strong>
              (<span *ngIf="p.value.type">{{p.value.type}}</span><span *ngIf="p.value.$ref">{{getSchemaDefinitionName(p.value.$ref)}}</span><span *ngIf="!isRequired(s.var.schema, p.key)">, optional</span>)</span><br />
            </span>
          <strong>{{ '}' }}</strong>
        </small>
      </p>
    </div>
  `;

  static errorPanel: string = `
    <div class="alert alert-danger" role="alert" *ngIf="errors.length > 0">
      <button type="button" class="close" aria-label="Close" (click)="clearErrors()"><span aria-hidden="true">&times;</span></button>
      <strong *ngIf="errors.length == 1">An error has occurred</strong>
      <strong *ngIf="errors.length > 1">Errors have occurred</strong>
      <p *ngIf="errors.length == 1">{{errors[0]}}</p>
      <ul *ngIf="errors.length > 1">
        <li *ngFor="let error of errors">{{error}}</li>
      </ul>
    </div>
  `;
}
