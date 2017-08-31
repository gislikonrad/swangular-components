import { Component, OnInit } from '@angular/core';
import { OAuthService, ApiKeyService } from "index";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  url: string = 'http://petstore.swagger.io/v2/swagger.json';
  apikey: string = '';

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
}
