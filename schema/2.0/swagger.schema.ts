export class Swagger {
  swagger: string;
  info: Info;
  host: string;
  basePath: string;
  schemes: string[];
  consumes: string[];
  produces: string[];
  paths: { [id: string] : Path };
  definitions: { [id: string]: Schema };
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
  headers: { [id: string] : Header };
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
  $ref: string;
  title: string;
  format: Format;
  type: Type;
  items: Schema;
  required: string[];
  properties: { [id: string]: Schema }
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

export type Type = 'object'|'string'|'integer'|'number'|'boolean'|'array';
export type Format = 'int32'|'int64'|'float'|'double'|'string'|'byte'|'binary'|'boolean'|'date'|'date-time'|'password';

export class Types {
  static object: Type = 'object';
  static array: Type = 'array';
  static string: Type = 'string';
  static number: Type = 'number';
  static integer: Type = 'integer';
  static boolean: Type = 'boolean';
}

export class DataTypes {
  static int32: Format = 'int32';
  static int64: Format = 'int64';
  static float: Format = 'float';
  static double: Format = 'double';
  static string: Format = 'string';
  static byte: Format = 'byte';
  static binary: Format = 'binary';
  static boolean: Format = 'boolean';
  static date: Format = 'date';
  static dateTime: Format = 'date-time';
  static password: Format = 'password';
}
