import { Component, OnInit, Input } from '@angular/core';
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";

type Document = OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;

@Component({
  selector: 'api-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Input() document: Document;

  constructor() { }

  ngOnInit() {
  }

  getTitle(): string {
    if (this.document && 'info' in this.document && this.document.info) 
      return this.document.info.title || 'API Documentation';    
    return 'API Documentation';
  }

  getUrl(): string {
    if(!this.document)
      return '';

    if('swagger' in this.document) {
      const swagger = this.document as OpenAPIV2.Document;
      let url = '';
      if (swagger.schemes && swagger.schemes.length > 0 && swagger.host) {
        url += swagger.schemes[0] + '://' + swagger.host;
      }
      if (swagger.basePath) {
        url += swagger.basePath;
      } 

      return url;
    }
    else if('openapi' in this.document) {
      const openapi = this.document as OpenAPIV3.Document | OpenAPIV3_1.Document;
      let url = '';
      if (openapi.servers && openapi.servers.length > 0) {
        url += openapi.servers[0].url;
      }
      return url;
    }
    return '';
  }

  getDescription(): string {
    if (this.document && 'info' in this.document && this.document.info) 
        return this.document.info.description || '';    
    return '';
  }
}
