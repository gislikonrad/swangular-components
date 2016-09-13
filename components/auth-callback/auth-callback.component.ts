import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, NgZone } from '@angular/core';
import { AuthService, OauthResponse } from '../../services/auth.service';
import { ErrorService } from '../../services/error.service';
import { TemplateProvider } from '../../services/template.provider';

@Component({
  selector: 'auth-callback',
  template: TemplateProvider.getTemplate('auth-callback') || `
    <div *ngIf="showResponse">
      <h5>Last response</h5>
      <pre>{{response | json}}</pre>
    </div>
  `
})

export class AuthCallbackComponent implements OnInit, OnDestroy {
  @Input() showResponse: boolean;
  isCallback: boolean;
  init = new EventEmitter();
  response: OauthResponse;

  constructor(
    private _zone: NgZone,
    private _authService: AuthService,
    private _errorService: ErrorService) {
      _authService.callbackReady = true;
      this.isCallback = !!window.opener;
      window['swangular'] = this;
  }

  oauthcallback(oauthResponse: OauthResponse) {
    this._zone.run(() => {
      this._authService.oauthResponse = oauthResponse;
      this.response = oauthResponse;
    });
  }

  ngOnInit() {
    this.init.emit({ isCallback: this.isCallback });
    if(this.isCallback) {
      let response: OauthResponse = null;
      if(window.location.hash) {
        let hash = location.hash.substring(1);
        response = this.parse(hash);
      }
      else if(window.location.search) {
        let search = location.search.substring(1);
        response = this.parse(search);
      }

      if(response && window.opener) {
        let swangular = (<AuthCallbackComponent>window.opener['swangular']);
        swangular.oauthcallback(response);
        window.close();
      }
    }
  }

  ngOnDestroy() {
  }

  private parse(query: string): OauthResponse {
    if(!query) {
      return null;
    }

    let json = `{ "${query.replace(/&/g, '","').replace(/=/g,'":"') }" }`;
    let response = JSON.parse(json, (key, value) => {
      if(key == 'expires_in') {
        return parseInt(value);
      }
      return key == '' ? value : this.decodeFormUrlEncoded(value);
    });
    return <OauthResponse>response;
  }

  private decodeFormUrlEncoded(value: string): string {
  	return decodeURIComponent(value.replace(/\+/g, '%20')).replace(/\r\n/g, '\n');
  }
}
