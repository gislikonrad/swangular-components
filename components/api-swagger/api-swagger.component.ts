import { Component, Input, OnInit } from '@angular/core';
import { ApiMethodComponent } from '../api-method/api-method.component';
import { SwaggerService } from '../../services/swagger.service';
import { TemplateProvider } from '../../services/template.provider';
import { Swagger } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'api-swagger',
  template: TemplateProvider.apiSwagger,
  directives: [ ApiMethodComponent ],
  providers: [ SwaggerService ]
})

export class ApiSwaggerComponent {
  @Input() set url(value: string) {
    if(value) {
      this._swaggerService.getSwagger(value).then(swagger => this.swagger = swagger);
    }
  }
  @Input() apiKey: string;

  swagger: Swagger;

  constructor(private _swaggerService: SwaggerService) {

  }

  get swaggerJson(): string {
    return JSON.stringify(this.swagger, null, 2);
  }
}
