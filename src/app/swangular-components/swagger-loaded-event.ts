import { Swagger } from "swagger-schema-ts";

export class SwaggerLoadedEvent {
  currentValue: Swagger;
  previousValue: Swagger;
}
