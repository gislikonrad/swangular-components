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

export class ApiSwaggerComponent implements OnInit {
  @Input() url: string;
  @Input() apiKey: string;

  swagger: Swagger;

  constructor(private _swaggerService: SwaggerService) {

  }

  ngOnInit() {
    this._swaggerService.getSwagger(this.url).then(swagger => this.swagger = swagger);
  }

  get swaggerJson(): string {
    return JSON.stringify(this.swagger, null, 2);
  }
}
