import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SwaggerService } from '../../services/swagger.service';
import { TemplateProvider } from '../../services/template.provider';
import { Swagger, Schema, Types, Type } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'api-model',
  template: TemplateProvider.getTemplate('api-model') || `
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
  `
})

export class ApiModelComponent implements OnInit, OnDestroy {
  @Input() schema: Schema;

  private _definitions: { [id: string]: Schema }
  private _sub: any;
  refs: string[];
  showModelSchema: boolean = false;


  constructor(private _swaggerService: SwaggerService) {

  }

  displayModelExample(schema: Schema): string {
    let model = this.generateDisplayObject(schema);
    return JSON.stringify(model, null, 2);
  }

  ngOnInit() {
    this._sub = this._swaggerService.current.subscribe(swagger => {
      this._definitions = swagger.definitions;
      this.refs = this.getSchemaRefs(this.schema);
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  getSchema($ref: string): Schema {
    let name = this.getSchemaDefinitionName($ref);
    return this._definitions[name];
  }

  getSchemaAndName($ref: string): any {
    let name = this.getSchemaDefinitionName($ref);
    return {
      name: name,
      schema: this._definitions[name]
    };
  }

  getSchemaDefinitionName($ref: string): string {
    if(!$ref) {
      return null;
    }
    let split = $ref.split('/');
    let name = split[split.length - 1];
    return name;
  }

  isRequired(schema: Schema, name: string): boolean {
    if(!schema.required) {
      return false;
    }
    return schema.required.indexOf(name) > -1;
  }

  private getSchemaRefs(schema: Schema, refs?: string[]): string[] {
    if(!refs) {
      refs = [];
    }
    if(schema.$ref && refs.indexOf(schema.$ref) == -1) {
      refs.push(schema.$ref);
      let name = this.getSchemaDefinitionName(schema.$ref);
      schema = this._definitions[name];
    }
    if(schema.properties) {
      for(let key in schema.properties) {
        let s = schema.properties[key];
        this.getSchemaRefs(s, refs);
      }
    }
    return refs;
  }

  private generateDisplayObject(schema: Schema): any {
    let $ref: string;
    if(!schema) {
      return '';
    }
    if(schema.$ref) {
      $ref = schema.$ref;
      let name = this.getSchemaDefinitionName(schema.$ref);
      schema = this._definitions[name];
    }
    if(schema.type == Types.array) {
      if(schema.items) {
        return [this.generateDisplayObject(schema.items)];
      }
      else {
        return [];
      }
    }
    if(schema.type != Types.object) {
      return this.getDefaultValue(schema).toString();
    }
    let model: any = {};
    for(let name in schema.properties) {
      let property = schema.properties[name];
      if(property.$ref && property.$ref == $ref) {
        model[name] = {};
      }
      else {
        model[name] = this.getDefaultValue(property);
      }
    }
    return model;
  }

  private getDefaultValue(schema: Schema): any {
    if(schema.$ref) {
      return this.generateDisplayObject(schema);
    }

    switch(schema.type){
      case Types.number:
      case Types.integer: return 0;

      case Types.boolean: return false;

      case Types.string: return 'string';
    }
  }
}
