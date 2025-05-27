import { Component, OnInit } from '@angular/core';
import { OAuthService, ApiKeyService } from "index";
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
type Document = OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  urls: string[] = [
    'https://api.lais.net/Accounts/AccessControl/v1/swagger/docs/v1',
    'https://generator3.swagger.io/openapi.json',
    'http://petstore.swagger.io/v2/swagger.json'
  ];

  url: string = this.urls[0];
  apikey: string = '';

  document: Document;

  constructor(private _oauth: OAuthService, private _apikey: ApiKeyService) { 
    // _oauth.addQueryParameter('auth_source', 'customer');
  }

  ngOnInit() {
  }

  loadUrl($event: any) {
    this.url = $event.srcElement.value;
  }

  setApiKey($event: any) {
    let apikey = $event.srcElement.value;
    this._apikey.apikey = apikey;
  }

  swaggerLoaded($event: any) {
    this.document = $event.currentValue;
  }
}
