import { Component, Input } from '@angular/core';
import { TemplateProvider } from '../../services/template.provider';
import { RequestMethod } from '@angular/http';

@Component({
  selector: 'http-method-label',
  template: TemplateProvider.getTemplate('http-method-label') || `
    <span class="label text-uppercase"
         [class.label-info]="isGet()"
         [class.label-success]="isPost()"
         [class.label-warning]="isPutOrPatch()"
         [class.label-danger]="isDelete()">{{getMethodName()}}</span>
  `,
  styles: [
      '.label { padding-top: 0.4em; }',
  ]
})

export class HttpMethodLabelComponent {
  @Input() method: string|RequestMethod;

  constructor() {

  }

  getMethodName(): string {
    if(!this.method) {
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
    return this.method && (this.method == RequestMethod.Get || this.caseInsensitiveEquals(<string>this.method, 'get'));
  }

  isPost(): boolean {
    return this.method && (this.method == RequestMethod.Post || this.caseInsensitiveEquals(<string>this.method, 'post'));
  }

  isPutOrPatch(): boolean {
    return this.method && (this.method == RequestMethod.Put
                        || this.method == RequestMethod.Patch
                        || this.caseInsensitiveEquals(<string>this.method, 'put')
                        || this.caseInsensitiveEquals(<string>this.method, 'patch'));
  }

  isDelete(): boolean {
    return this.method && (this.method == RequestMethod.Delete || this.caseInsensitiveEquals(this.method, 'delete'));
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
