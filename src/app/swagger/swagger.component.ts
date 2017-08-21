import { Component, OnInit, Input, OnChanges, SimpleChanges, ContentChild } from '@angular/core';
import { Swagger } from "../schema/2.0/swagger.schema";
import { SwaggerService } from "../services/swagger.service";

@Component({
  selector: 'api-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})
export class SwaggerComponent implements OnInit, OnChanges {
  @Input() url: string;
  @Input() showHeader: boolean = true; 

  swagger: Swagger;

  constructor(private _service: SwaggerService) { 
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.url.previousValue !== changes.url.currentValue) {
      this.swagger = null;
      if(changes.url.currentValue) {
        this
          ._service
          .getSwagger(changes.url.currentValue)
          .then(swagger => this.swagger = swagger);
      }
    }
  }
}
