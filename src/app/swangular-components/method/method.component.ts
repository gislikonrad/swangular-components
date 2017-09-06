import { Component, OnInit, Input } from '@angular/core';
import { Operation, Response, Swagger, Reference } from "swagger-schema-ts";
import { JsonReferenceService } from "../services/json-reference.service";

@Component({
  selector: 'api-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})
export class MethodComponent implements OnInit {
  @Input() operation: Operation;
  @Input() method: string;
  @Input() urlTemplate: string;
  @Input() swagger: Swagger;

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

  private getOtherResponses(): any {
    let responses: { [id: string] : Response } = {};
    let code = this.getDefaultResponseCode();
    for(let key in this.operation.responses) {
        if(key == code) {
          continue;
        }
        responses[key] = this.getResponse(this.operation.responses[key]);
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

  private getResponse(response: Response | Reference): Response {
    let reference = <Reference>response;
    if(reference.$ref) return this.getResponseByReference(reference.$ref);
    return <Response>response;
  }

  private getResponseByReference($ref: string): Response {
    return this._jsonReference.dereference<Response>(this.swagger, $ref);
  }
}
