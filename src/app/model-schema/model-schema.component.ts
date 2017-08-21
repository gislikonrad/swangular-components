import { Component, OnInit, Input } from '@angular/core';
import { Schema, Types } from "../schema/2.0/swagger.schema";

@Component({
  selector: 'api-model-schema',
  templateUrl: './model-schema.component.html',
  styleUrls: ['./model-schema.component.css']
})
export class ModelSchemaComponent implements OnInit {
  @Input() schema: Schema;

  // refs: [];

  constructor() { }

  ngOnInit() {
      // if(this.schema) {
      //   this.refs = this.getSchemaRefs(this.schema);
      // }
  }

  // getSchemaDefinitionName($ref: string): string {
  //   if(!$ref) {
  //     return null;
  //   }
  //   let split = $ref.split('/');
  //   let name = split[split.length - 1];
  //   return name;
  // }

  // private getSchemaRefs(schema: Schema, refs?: string[]): string[] {
  //   if(!refs) {
  //     refs = [];
  //   }
  //   if(schema.type == Types.array) {
  //     if(schema.items) {
  //       return this.getSchemaRefs(schema.items, refs);
  //     }
  //   }
  //   if(schema.$ref && refs.indexOf(schema.$ref) == -1) {
  //     refs.push(schema.$ref);
  //     let name = this.getSchemaDefinitionName(schema.$ref);
  //     schema = this._definitions[name];
  //   }
  //   if(schema.properties) {
  //     for(let key in schema.properties) {
  //       let s = schema.properties[key];
  //       this.getSchemaRefs(s, refs);
  //     }
  //   }
  //   return refs;
  // }
}
