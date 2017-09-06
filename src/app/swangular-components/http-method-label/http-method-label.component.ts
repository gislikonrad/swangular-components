import { Component, OnInit, Input } from '@angular/core';
import { RequestMethod } from "@angular/http";

@Component({
  selector: 'api-http-method-label',
  templateUrl: './http-method-label.component.html',
  styleUrls: ['./http-method-label.component.css']
})
export class HttpMethodLabelComponent {
  @Input() method: string|RequestMethod;

  constructor() {

  }

  getMethodName(): string {
    if(this.method == null) {
      return '';
    }
    switch(this.method) {
      case RequestMethod.Head: return 'head';
      case RequestMethod.Delete: return 'delete';
      case RequestMethod.Patch: return 'patch';
      case RequestMethod.Options: return 'options';
      case RequestMethod.Put: return 'put';
      case RequestMethod.Post: return 'post';
      case RequestMethod.Get: return 'get';
      default: return this.method.toString();
    }
  }

  isGet(): boolean {
    return this.method != null && (this.method == RequestMethod.Get || this.caseInsensitiveEquals(<string>this.method, 'get'));
  }

  isPost(): boolean {
    return this.method != null && (this.method == RequestMethod.Post || this.caseInsensitiveEquals(<string>this.method, 'post'));
  }

  isPutOrPatch(): boolean {
    return this.method != null && 
      (this.method == RequestMethod.Put ||
       this.method == RequestMethod.Patch ||
       this.caseInsensitiveEquals(<string>this.method, 'put') ||
       this.caseInsensitiveEquals(<string>this.method, 'patch'));
  }

  isDelete(): boolean {
    return this.method != null && (this.method == RequestMethod.Delete || this.caseInsensitiveEquals(this.method, 'delete'));
  }

  isOther(): boolean {
    return !this.isGet() && !this.isPost() && !this.isPutOrPatch() && !this.isDelete();
  }

  private caseInsensitiveEquals(v1: string|RequestMethod, v2: string): boolean {
    if(!v1){
      return v1 == v2;
    }
    if((typeof v1) != 'string') {
      v1 = v1.toString();
    }
    return (<string>v1).toLowerCase() == v2.toLowerCase();
  }

}
