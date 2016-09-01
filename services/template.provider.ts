export class TemplateProvider {
  static apiSwagger: string = `
    <div class="container" *ngIf="swagger">
      <h2>{{swagger.info.title}} <small>on https://{{swagger.host + swagger.basePath}}</small></h2>
      <p>{{swagger.info.description}}</p>
      <div *ngFor="let pair of swagger.paths | keyValuePairs">
        <h3>{{pair.key}}</h3>
        <api-method *ngFor="let path of pair.value | keyValuePairs"
          path="{{path.value}}"
          verb="{{path.key}}"
          urlTemplate="{{pair.key}}"></api-method>
      </div>
      <pre>{{swaggerJson}}</pre>
    </div>
  `;

  static apiMethod: string = `
    <div class="panel" [class.panel-default]="verb == 'get'" [class.panel-success]="verb == 'post'">
      <div class="panel-heading" (click)="expanded = !expanded">
        <h3 class="panel-title">
          <span class="label" [class.label-default]="verb == 'get'" [class.label-success]="verb == 'post'">{{verb}}</span> {{urlTemplate}}
          <span class="pull-right">{{path.description}}</span>
        </h3>
      </div>
      <div class="panel-body" *ngIf="expanded">
        <div class="row">
          <div class="col-md-10">
            <p *ngIf="path.summary">{{path.summary}}</p>
          </div>
          <div class="col-md-2">
            Security will be here
          </div>
        </div>
      </div>
    </div>
  `;

  static apiMethodResponses: string = `
    
  `;
}
