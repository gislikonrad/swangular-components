import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiMethodComponent } from '../api-method/api-method.component';
import { AuthService } from '../../services/auth.service';
import { RequestBuilder } from '../../services/request.builder';
import { SwaggerService } from '../../services/swagger.service';
import { TemplateProvider } from '../../services/template.provider';
import { Swagger } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'api-swagger',
  template: TemplateProvider.getTemplate('api-swagger') || `
    <div *ngIf="swagger">
      <h2>{{swagger.info.title}} <small>on {{scheme}}://{{swagger.host + (swagger.basePath || '')}}</small></h2>
      <p>{{swagger.info.description}}</p>
      <div *ngFor="let pair of swagger.paths | keyValuePairs">
        <h3>{{pair.key}}</h3>
        <api-method *ngFor="let path of pair.value | keyValuePairs"
          [operation]="path.value"
          [method]="path.key"
          [urlTemplate]="pair.key"></api-method>
      </div>
      <api-request-modal></api-request-modal>
    </div>
  `,
  directives: [ ApiMethodComponent ],
  providers: [ SwaggerService, RequestBuilder ]
})

export class ApiSwaggerComponent {
  @Output() onUpdate = new EventEmitter();
  @Input() set forceSecure(value: boolean) {
    this._forceSecure = value;
    this._requestBuilder.forceSecure = value;
  }
  @Input() set url(value: string) {
    this.swagger = null;
    if(value) {
      this._swaggerService.getSwagger(value).then(swagger => {
        this.swagger = swagger;
        this.onUpdate.emit(swagger);
      });
    }
  }
  private _forceSecure: boolean;
  swagger: Swagger;

  constructor(
    private _swaggerService: SwaggerService,
    private _authService: AuthService,
    private _requestBuilder: RequestBuilder) {
  }

  get swaggerJson(): string {
    return JSON.stringify(this.swagger, null, 2);
  }


  get scheme(): string {
    if(!this.swagger) {
      return null;
    }
    if(this._forceSecure || this.swagger.schemes.indexOf('https') > -1) { // force or prefer https
      return 'https';
    }
    return this.swagger.schemes[0];
  }
}
