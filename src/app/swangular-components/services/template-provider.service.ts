import { Injectable, TemplateRef } from '@angular/core';

@Injectable()
export class TemplateProviderService {

  private _templates: { [id: string]: TemplateRef<any> } = {}

  constructor() { }

  add(key: string, template: TemplateRef<any>) {
    this._templates[key] = template;
  }

  get(key: string): TemplateRef<any> {
    return this._templates[key];
  }
}
