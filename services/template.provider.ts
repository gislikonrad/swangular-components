export class TemplateProvider {
  private static _templates: { [id: string]: string } = {};

  static getTemplate(key: string): string {
    return TemplateProvider._templates[key];
  }

  static addTemplate(key: string, template: string): void {
    TemplateProvider._templates[key] = template;
  }
}
