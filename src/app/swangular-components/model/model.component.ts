import { Component, OnInit, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { DocumentService } from "../services/document.service";
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
type Document = OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;
type Schema = OpenAPIV2.SchemaObject | OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject;

@Component({
  selector: 'api-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {
  @Input() schema: Schema;
  @Input() document: Document;
  @Input() contentType?: string;

  // private _definitions: { [id: string]: Schema }
  private _sub: any;
  refs: string[];
  showModelSchema: boolean = false;

  constructor(private _service: DocumentService) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.document || changes.schema) {
      if(this.schema && this.document) {
        this.refs = this.getSchemaRefs(this.schema);
      }
    }
  }

  displayModelExample(schema: Schema): string {
    let model = this.generateDisplayObject(schema);
    return JSON.stringify(model, null, 2);
  }

  getPropertyTypeName(schema: Schema): string {
    if(schema.type) {
      if(schema.type == 'array' && 'items' in schema) 
        return `Array[${this.getPropertyTypeName(schema.items)}]`;
      
      return schema.type.toString();
    }
    if('$ref' in schema) {
      return this.getSchemaDefinitionName(schema.$ref);
    }
  }

  getSchema($ref: string): Schema {
    let name = this.getSchemaDefinitionName($ref);
    return this.getSchemas()[name];
  }

  getSchemaAndName($ref: string): any {
    let name = this.getSchemaDefinitionName($ref);
    return {
      name: name,
      schema: this.getSchemas()[name]
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
    if('required' in schema){
      if(!schema.required) {
        return false;
      }
      return schema.required.indexOf(name) > -1;
    }
    if('properties' in schema) {
      let property = schema.properties[name];
      if(property && 'nullable' in property) 
        return !property.nullable;
    }
    return true;
  }

  private getSchemaRefs(schema: Schema, refs?: string[]): string[] {
    if(!refs) {
      refs = [];
    }
    if('type' in schema) {
      if(schema.type == 'array' && 'items' in schema) {
        let items: Schema = schema.items;
        return this.getSchemaRefs(items, refs);
      }
    }
    if('$ref' in schema && refs.indexOf(schema.$ref) == -1) {
      refs.push(schema.$ref);
      let name = this.getSchemaDefinitionName(schema.$ref);
      schema = this.getSchemas()[name]
    }
    if('properties' in schema) {
      for(let key in schema.properties) {
        let s = schema.properties[key];
        this.getSchemaRefs(s, refs);
      }
    }
    return refs;
  }

  private generateDisplayObject(schema: Schema): any {
    let $ref: string;
    if(!schema || !this.document) {
      return '';
    }
    if('$ref' in schema) {
      $ref = schema.$ref;
      let name = this.getSchemaDefinitionName(schema.$ref);
      schema = this.getSchemas()[name];
    }
    if('type' in schema) {
      if(schema.type == 'array') {
        if(schema.items) {
          return [this.generateDisplayObject(schema.items)];
        }
        else {
          return [];
        }
      }
      if(schema.type != 'object') {
        return this.getDefaultValue(schema).toString();
      }
    }
    let model: any = {};
    for(let name in schema.properties) {
      let property = schema.properties[name];
      if('$ref' in property && property.$ref == $ref) {
        model[name] = {};
      }
      else {
        model[name] = this.getDefaultValue(property);
      }
    }
    return model;
  }

  private getDefaultValue(schema: Schema): any {
    if(schema.type && schema.type == 'array') {
      return [this.getDefaultValue(schema.items)];
    }

    if('$ref' in schema) {
      return this.generateDisplayObject(schema);
    }

    if(schema.type == 'number' || schema.type == 'integer') {
      return schema.minimum || 0;
    }

    if(schema.type == 'boolean') {
      return false;
    }

    if(schema.type == 'string') {
      if(schema.enum) {
        return schema.enum[0];
      }
      return 'string';
    }
  }

  private getSchemas(): { [id:string]: Schema } {
    if(!this.document) return {};
    if('definitions' in this.document) {
      return this.document.definitions;
    }

    if('components' in this.document && 'schemas' in this.document.components) {
      return this.document.components.schemas;
    }
    throw new Error("Swagger does not contain definitions");
  }

}
