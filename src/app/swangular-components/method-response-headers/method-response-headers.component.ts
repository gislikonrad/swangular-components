import { Component, OnInit, Input } from '@angular/core';
import { Header } from "swagger-schema-ts";

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
