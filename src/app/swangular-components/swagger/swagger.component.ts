import { Component, OnInit, Input, OnChanges, SimpleChanges, ContentChild, Output, EventEmitter } from '@angular/core';
import { SwaggerService } from "../services/swagger.service";
import { Swagger } from 'swagger-schema-ts';

@Component({
  selector: 'api-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})
export class SwaggerComponent implements OnInit, OnChanges {
  @Input() url: string;
  @Input() showHeader: boolean = true; 

  @Output() swaggerLoaded = new EventEmitter();

  swagger: Swagger;

  constructor(private _service: SwaggerService) { 
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.url.previousValue !== changes.url.currentValue) {
      let previous = this.swagger;
      this.swagger = null;
      if(changes.url.currentValue) {
        this
          ._service
          .getSwagger(changes.url.currentValue)
          .then(swagger => {
            this.swaggerLoaded.emit({ currentValue: swagger, previousValue: previous });
            this.swagger = swagger;
          });
      }
      else {
        this.swaggerLoaded.emit({ currentValue: null, previousValue: previous });
      }
    }
  }
}
