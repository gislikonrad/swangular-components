export class Swagger {
  swagger: string;
  info: Info;
  host: string;
  basePath: string;
  schemes: string[];
  consumes: string[];
  produces: string[];
  paths: { [id: string] : Path };
}

export class Info {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: Contact;
  licence?: License;
  version: string;
}

export class Path {
  get: Operation;
  put: Operation;
  post: Operation;
  delete: Operation;
  options: Operation;
  head: Operation;
  patch: Operation;
  parameters: (Reference|Parameter)[];
}

export class Operation {
  tags: string[];
  operationId: string;
  summary: string;
  description: string;
  externalDocs: ExternalDocumentation;
  consumes: string[];
  produces: string[];
  parameters: (Reference|Parameter)[];
  responses: { [id: string] : Response };
  schemes: string[];
  deprecates: boolean;
  security: SecurityRequirement;
}

export class Contact {
  name: string;
  url: string;
  email: string;
}

export class License {
  name: string;
  url: string;
}

export class Parameter {
  name: string;
  in: In;
  description: string;
  required: boolean;
  schema: Schema;
  type: string;
  format: string;
  allowEmptyValue: boolean;
  items: Item[];
}

export class Reference {
}

export class Response {
  description: string;
  schema: string;
  headers: { [id: string] : Response };
}

export class Header {

}

export class SecurityRequirement {

}

export class ExternalDocumentation {
  description: string;
  url: string;
}

export class Schema {

}

export class Item {

}

export enum In {
  query,
  header,
  path,
  formData,
  body
}
