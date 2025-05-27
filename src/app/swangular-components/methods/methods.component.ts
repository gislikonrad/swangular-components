import { Component, Input } from '@angular/core';
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";

@Component({
  selector: 'api-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.css']
})
export class MethodsComponent {
  @Input() document: OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;
  constructor() { }
}
