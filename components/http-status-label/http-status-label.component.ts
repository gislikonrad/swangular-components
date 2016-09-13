
    // [class.bg-success]="response.ok"
    // [class.bg-info]="response.status >=300 || response.status < 400"
    // [class.bg-warning]="response.status >=400 || response.status < 500"
    // [class.bg-danger]="response.status >=500"

import { Component, Input } from '@angular/core';
import { TemplateProvider } from '../../services/template.provider';

@Component({
  selector: 'http-status-label',
  template: TemplateProvider.getTemplate('http-status-label') || `
    <span class="label"
         [class.label-success]="isSuccess()"
         [class.label-info]="isRedirect()"
         [class.label-warning]="isClientError()"
         [class.label-danger]="isServerError()">{{status}} <span class="badge">{{statusCode}}</span></span>
  `,
  styles: [
      '.label { padding-top: 0.4em; }',
  ]
})

export class HttpStatusLabelComponent {
  @Input() statusCode: number;
  @Input() status: String;

  constructor() {

  }

  isSuccess(): boolean {
    return this.statusCode >= 200 && this.statusCode < 300;
  }

  isRedirect(): boolean {
    return this.statusCode >= 300 && this.statusCode < 400;
  }

  isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  isServerError(): boolean {
    return this.statusCode >= 500;
  }
}
