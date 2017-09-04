import { Component, OnInit, Input } from '@angular/core';
import { Swagger } from "swagger-schema-ts";

@Component({
  selector: 'api-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.css']
})
export class MethodsComponent implements OnInit {
  @Input() swagger: Swagger;
  constructor() { }

  ngOnInit() {
  }

}
