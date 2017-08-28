import { Component, OnInit, Input } from '@angular/core';
import { Response } from "swagger-schema-ts";

@Component({
  selector: 'api-method-responses',
  templateUrl: './method-responses.component.html',
  styleUrls: ['./method-responses.component.css']
})
export class MethodResponsesComponent implements OnInit {
  @Input() responses: { [id: string] : Response };

  constructor() { }

  ngOnInit() {
  }

}
