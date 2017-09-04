import { Component, OnInit, Input } from '@angular/core';
import { Swagger } from "swagger-schema-ts";

@Component({
  selector: 'api-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Input() swagger: Swagger;

  constructor() { }

  ngOnInit() {
  }
}
