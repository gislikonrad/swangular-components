import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SwaggerService } from '../../services/swagger.service';
import { TemplateProvider } from '../../services/template.provider';
import { Swagger, Schema, Types } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'api-model',
  template: TemplateProvider.apiModel
})

export class ApiModelComponent implements OnInit, OnDestroy {
  @Input() schema: Schema;

  private _definitions: { [id: string]: Schema }
  private _sub: any;

  constructor(private _swaggerService: SwaggerService) {

  }

  displayModelSchema(schema: Schema): string {
    if(!schema) {
      return '';
    }
    if(schema.$ref) {
      let s = this.getSchemaDefinition(schema.$ref);
      return this.displayModelSchema(s);
    }
    if(schema.type != Types.object) {
      return schema.type.toString();
    }
    let display: any = {};
    for(let name in schema.properties) {
      let type = schema.properties[name].type;
      if(type == Types.object) {
        display[name] = {};
      }
      else {
        display[name] = type;
      }
    }
    return JSON.stringify(display, null, 2);
  }

  generateModel(schema: Schema): string {
    return 'example';
  }

  isReady(): boolean {
    return this._definitions != null;
  }

  ngOnInit() {
    this._sub = this._swaggerService.current.subscribe(swagger => this._definitions = swagger.definitions);
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  private getSchemaDefinition($ref: string): Schema {
    if(!$ref) {
      return null;
    }
    let split = $ref.split('/');
    let name = split[split.length - 1];
    return this._definitions[name];
  }
}
