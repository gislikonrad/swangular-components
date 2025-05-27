import { Component, OnInit, Input } from '@angular/core';
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
import { JsonReferenceService } from "../services/json-reference.service";

type Document = OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;
type Response = OpenAPIV2.Response | OpenAPIV3.ResponseObject | OpenAPIV3_1.ResponseObject;
type Operation = OpenAPIV2.OperationObject | OpenAPIV3.OperationObject | OpenAPIV3_1.OperationObject;
type ResponseReference = OpenAPIV2.ReferenceObject | OpenAPIV3.ReferenceObject | OpenAPIV3_1.ReferenceObject;
type Schema = OpenAPIV2.SchemaObject | OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject;

@Component({
  selector: 'api-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})

export class MethodComponent implements OnInit {
  @Input() operation: Operation;
  @Input() method: string;
  @Input() urlTemplate: string;
  @Input() document: Document;

  defaultResponseCode: string;
  defaultResponse: Response;
  otherResponses: { [id: string]: Response };

  expanded: boolean = false;

  constructor(private _jsonReference: JsonReferenceService) {}

  ngOnInit() {
    this.defaultResponseCode = this.getDefaultResponseCode();
    this.defaultResponse = this.getResponse(this.operation.responses[this.defaultResponseCode]);
    this.otherResponses = this.getOtherResponses();
  }

  isGet(method: string): boolean {
    return method=='get';
  }

  isPost(method: string): boolean {
    return method=='post';
  }

  isPutOrPatch(method: string): boolean {
    return method=='put' || method=='patch';
  }

  isDelete(method: string): boolean {
    return method =='delete';
  }

  isOther(method: string): boolean {
    return !this.isGet(method) && !this.isPost(method) && !this.isPutOrPatch(method) && !this.isDelete(method);
  }

  private getDefaultResponseSchema(): Schema {
    if(!this.document || !this.defaultResponse) {
      return null;
    }
    if('content' in this.defaultResponse) {
      let content = this.defaultResponse.content;
      for(let type in content) {
        if(type != 'application/json' && type != 'text/json') 
          continue;

        let contentType = content[type];
        if(contentType.schema) {
          return contentType.schema;
        }
      }
    }

    if('$ref' in this.defaultResponse) {
      let ref = <string>this.defaultResponse.$ref;
      return this._jsonReference.dereference<Schema>(this.document, ref);
    }
    else if('schema' in this.defaultResponse) {
      return this.defaultResponse.schema;
    }
    return null;
  }

  private getOtherResponses(): any {
    let responses: { [id: string] : Response } = {};
    let code = this.getDefaultResponseCode();
    for(let key in this.operation.responses) {
        if(key == code) {
          continue;
        }
        let r = this.operation.responses[key];
        responses[key] = this.getResponse(r);
    }
    return responses;
  }

  private getDefaultResponseCode(): string {
    let code: string = '1000';
    for(let key in this.operation.responses) {
      if((+code) > (+key)) {
        code = key;
      }
    }
    return code;
  }

  private getResponse(response: Response | ResponseReference): Response {
    if(!response) return null;

    if('content' in response) {
      let content = response.content;
      for(let type in response.content) {
        if(type != 'application/json' && type != 'text/json') 
          continue;

        let contentType = content[type];

        if(contentType.schema && '$ref' in contentType.schema) {
          let ref = <string>contentType.schema.$ref;
          return this.getResponseByReference(ref);
        }
      }
    }

    if('$ref' in response) 
    {
      let ref = <string>response.$ref;
      return this.getResponseByReference(ref);
    }
    else
    {
      return response;
    }
  }

  private getResponseByReference($ref: string): Response {
    return this._jsonReference.dereference<Response>(this.document, $ref);
  }
}
