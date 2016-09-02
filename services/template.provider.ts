export class TemplateProvider {
  static apiSwagger: string = `
    <div *ngIf="swagger">
      <h2>{{swagger.info.title}} <small>on https://{{swagger.host + swagger.basePath}}</small></h2>
      <p>{{swagger.info.description}}</p>
      <div *ngFor="let pair of swagger.paths | keyValuePairs">
        <h3>{{pair.key}}</h3>
        <api-method *ngFor="let path of pair.value | keyValuePairs"
          [operation]="path.value"
          [verb]="path.key"
          [urlTemplate]="pair.key"></api-method>
      </div>
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
          <span class="label" [class.label-default]="verb == 'get'" [class.label-success]="verb == 'post'">{{verb}}</span> {{urlTemplate}}
          <span class="pull-right">{{operation.summary}}</span>
        </h3>
      </div>
      <div class="panel-body" *ngIf="expanded">
        <div class="row">
          <div class="col-md-10">
            <div *ngIf="operation.summary">
              <h4>Implementation notes</h4>
              <p [innerHtml]="operation.description"></p>
            </div>
          </div>
          <div class="col-md-2">
            Security will be here
          </div>
        </div>
        <api-method-responses [responses]="operation.responses"></api-method-responses>
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
    <div>
      <button type="button" class="btn btn-default btn-xs" (click)="modelSchema=false" [class.active]="!modelSchema">Model</button>
      <button type="button" class="btn btn-default btn-xs" (click)="modelSchema=true" [class.active]="modelSchema">Model Schema</button>
    </div>
    <pre *ngIf="modelSchema">{{ displayModelSchema(schema) }}</pre>
    <pre *ngIf="!modelSchema">{{ generateModel(schema) }}</pre>
  `;
}
