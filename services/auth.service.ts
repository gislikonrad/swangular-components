import { Injectable } from '@angular/core';
import { ApiKeyProvider } from './api-key.provider';
import { ErrorService } from './error.service';
import { guid } from './guid';

@Injectable()
export class AuthService {
    private _callbackUrl: string;
    private _errorReported: boolean;
    private _guid: string;
    private _scopes: string[];
    callbackReady: boolean = false;

    constructor(
      private _apiKeyProvider: ApiKeyProvider,
      private _errorService: ErrorService) {
      let callbackUrl = `${window.location.protocol}//${window.location.host}`;
      this._callbackUrl = callbackUrl;
      this._guid = localStorage['guid'] || guid;
      localStorage['guid'] = this._guid;
    }

    generateSigninUrl(authorizationUrl: string, scopes: string[]): string {
      let parameters:string[] = [];
      this._scopes = scopes;
      if(this._apiKeyProvider.apikey) {
        parameters.push('client_id=' + this._apiKeyProvider.apikey);
      }
      parameters.push('redirect_uri=' + encodeURIComponent(this._callbackUrl));
      parameters.push('response_type=id_token%20token');
      parameters.push('scope=' + encodeURIComponent(scopes.join(' ')));
      parameters.push('nonce=acm');
      parameters.push('state=' + this._guid);
      return this.combine(authorizationUrl, parameters);
    }

    canSignIn(): boolean {
      if(!this.callbackReady && !this._errorReported) {
        this._errorReported = true;
        this._errorService.setError('Cannot sign in for secure api request. The auth callback component has not been put into the app component template. Add the <auth-callback></auth-callback> to your app component template.');
      }
      return this.callbackReady && !this.oauthResponse;
    }

    isSignedIn(): boolean {
      let response = this.oauthResponse;
      return response != null;
    }

    get tokenType(): string {
      let response = this.oauthResponse;
      if(!response) {
        return null;
      }
      return response.token_type;
    }

    get accessToken(): string {
      let response = this.oauthResponse;
      if(!response) {
        return null;
      }
      return response.access_token;
    }

    clearToken() {
      localStorage.removeItem(this._guid);
    }

    get scopes(): string[] {
      let response = this.oauthResponse;
      if(!response) {
        return null;
      }
      if(!response.scope) {
        return this._scopes;
      }
      return response.scope.split(' ');
    }

    get oauthResponse(): OauthResponse {
      let json = localStorage[this._guid];
      if(!json) {
        return null;
      }
      let state = JSON.parse(json);
      this._scopes = state.scopes;
      let now = new Date();
      let expires = new Date(state.expires);
      if(expires < now) {
        localStorage.removeItem(this._guid);
        return null;
      }
      return <OauthResponse>state.response;
    }

    set oauthResponse(value: OauthResponse) {
      if(value) {
        if(value.state != this._guid) {
          this._errorService.setError(`Received incorrect state from auth server. Expected '${this._guid}'. Got '${value.state}'.`);
          this.clearToken();
          return;
        }
        if(value.error) {
          let message = `${value.error}: ${value.error_description}`;
          this._errorService.setError(message);
          return;
        }
        let expiresIn = value.expires_in;
        let now = new Date();
        let expires = new Date(now.getTime() + expiresIn * 1000);
        let state = {
          response: value,
          expires: expires,
          scopes: this._scopes
        };
        localStorage[this._guid] = JSON.stringify(state);
      }
      else {
        localStorage.removeItem(this._guid);
      }
    }

    private combine(url : string, parameters : string[]) : string {
      if(!parameters || !parameters.length) {
        return url;
      }

      let combined = url;

      if(combined.indexOf('?') < 0) {
        combined += '?';
      }
      else {
        combined += '&';
      }
      combined += parameters.join('&');
      return combined;
    }
}

export class OauthResponse {
  // error
  error?: string;
  error_description?: string;

  // valid
  access_token?: string;
  expires_in?: number;
  id_token?: string;
  scope?: string;
  session_state?: string;
  token_type?: string;
  state?: string;
}
