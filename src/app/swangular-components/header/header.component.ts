import { Component, OnInit, Input } from '@angular/core';
import { Swagger } from "swagger-schema-ts";

@Component({
  selector: 'api-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() swagger: Swagger;

  constructor() { }

  ngOnInit() {
  }
}
