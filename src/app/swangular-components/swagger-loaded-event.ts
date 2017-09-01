import { Swagger } from "swagger-schema-ts/dist";

export class SwaggerLoadedEvent {
  currentValue: Swagger;
  previousValue: Swagger;
}
