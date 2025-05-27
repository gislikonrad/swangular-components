import { Component, OnInit, Input, OnChanges, SimpleChanges, ContentChild, Output, EventEmitter } from '@angular/core';
import { DocumentService } from "../services/document.service";
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
import { DocumentLoadedEvent } from "../document-loaded-event";

@Component({
  selector: 'api-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})
export class SwaggerComponent implements OnInit, OnChanges {
  @Input() url: string;
  @Input() showHeader: boolean = true; 

  @Output() documentLoaded = new EventEmitter<DocumentLoadedEvent>();

  document: OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;

  constructor(private _service: DocumentService) { 
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.url.previousValue !== changes.url.currentValue) {
      let previous = this.document;
      this.document = null;
      if(changes.url.currentValue) {
        this
          ._service
          .getSwagger(changes.url.currentValue)
          .then(document => {
            this.documentLoaded.emit({ currentValue: document, previousValue: previous });
            this.document = document;
          });
      }
      else {
        this.documentLoaded.emit({ currentValue: null, previousValue: previous });
      }
    }
  }
}
