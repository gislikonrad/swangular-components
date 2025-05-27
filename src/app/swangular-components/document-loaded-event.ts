import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";

export class DocumentLoadedEvent {
  currentValue: OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;
  previousValue: OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;
}
