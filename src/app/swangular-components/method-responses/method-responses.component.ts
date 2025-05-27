import { Component, OnInit, Input } from '@angular/core';
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
type Document = OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;
type Response = OpenAPIV2.Response | OpenAPIV3.ResponseObject | OpenAPIV3_1.ResponseObject;

@Component({
  selector: 'api-method-responses',
  templateUrl: './method-responses.component.html',
  styleUrls: ['./method-responses.component.css']
})
export class MethodResponsesComponent implements OnInit {
  @Input() responses: { [id: string] : Response };
  @Input() document: Document;

  constructor() { }

  ngOnInit() {
  }

}
