import { Component, OnInit, Input } from '@angular/core';
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
type Header = OpenAPIV2.HeaderObject | OpenAPIV3.HeaderObject | OpenAPIV3_1.HeaderObject;

@Component({
  selector: 'api-method-response-headers',
  templateUrl: './method-response-headers.component.html',
  styleUrls: ['./method-response-headers.component.css']
})
export class MethodResponseHeadersComponent implements OnInit {
  @Input() headers: { [id: string] : Header };
  
  constructor() { }

  ngOnInit() {
  }

}
