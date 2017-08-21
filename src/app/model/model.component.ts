import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Schema, Types } from "../schema/2.0/swagger.schema";
import { SwaggerService } from "../services/swagger.service";

@Component({
  selector: 'api-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit, OnDestroy {
  @Input() schema: Schema;

  private _definitions: { [id: string]: Schema }
  private _sub: any;
  refs: string[];
  showModelSchema: boolean = false;

  constructor(private _service: SwaggerService) { }

  ngOnInit() {
    this._sub = this._service.current.subscribe(swagger => {
      if(!swagger) return;
      this._definitions = swagger.definitions;
      if(this.schema){
        this.refs = this.getSchemaRefs(this.schema);
      }
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  displayModelExample(schema: Schema): string {
    let model = this.generateDisplayObject(schema);
    return JSON.stringify(model, null, 2);
  }

  getPropertyTypeName(schema: Schema): string {
    if(schema.type) {
      if(schema.type == Types.array) {
        return `Array[${this.getPropertyTypeName(schema.items)}]`;
      }
      return schema.type;
    }
    if(schema.$ref) {
      return this.getSchemaDefinitionName(schema.$ref);
    }
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
    if(schema.type == Types.array) {
      if(schema.items) {
        return this.getSchemaRefs(schema.items, refs);
      }
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
    if(schema.type && schema.type == Types.array) {
      return [this.getDefaultValue(schema.items)];
    }

    if(schema.$ref) {
      return this.generateDisplayObject(schema);
    }

    if(schema.type == Types.number || schema.type == Types.integer) {
      return schema.minimum || 0;
    }

    if(schema.type == Types.boolean) {
      return false;
    }

    if(schema.type == Types.string) {
      if(schema.enum) {
        return schema.enum[0];
      }
      return 'string';
    }
  }

}
