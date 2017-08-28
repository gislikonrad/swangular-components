import { Component, OnInit, Input } from '@angular/core';
import { Operation, Response } from "swagger-schema-ts";

@Component({
  selector: 'api-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})
export class MethodComponent implements OnInit {
  @Input() operation: Operation;
  @Input() method: string;
  @Input() urlTemplate: string;

  defaultResponseCode: string;
  defaultResponse: Response;
  otherResponses: { [id: string]: Response };

  constructor() {}

  ngOnInit() {
    this.defaultResponseCode = this.getDefaultResponseCode();
    this.defaultResponse = this.operation.responses[this.defaultResponseCode];
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
        responses[key] = this.operation.responses[key];
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

}
