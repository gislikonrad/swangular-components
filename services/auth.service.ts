import { Injectable } from '@angular/core';
import { ApiKeyProvider } from './api-key.provider';
import { ErrorService } from './error.service';

@Injectable()
export class AuthService {
    private _callbackUrl: string;
    callbackReady: boolean = false;

    constructor(
      private _apiKeyProvider: ApiKeyProvider,
      private _errorService: ErrorService) {
      let callbackUrl = `${window.location.protocol}//${window.location.host}`;
      this._callbackUrl = callbackUrl;
    }

    generateSigninUrl(authorizationUrl: string, scopes: string[]): string {
      let parameters:string[] = [];
      parameters.push('client_id=' + this._apiKeyProvider.apikey);
      parameters.push('redirect_uri=' + encodeURIComponent(this._callbackUrl));
      parameters.push('response_type=id_token%20token');
      parameters.push('scope=' + encodeURIComponent(scopes.join(' ')));
      parameters.push('nonce=acm');
      return this.combine(authorizationUrl, parameters);
    }

    canSignIn(): boolean {
      if(!this.callbackReady) {
        this._errorService.setError('Cannot sign in for secure api request. The auth callback component has not been put into the app component template. Add the <auth-callback></auth-callback> to your app component template.');
      }
      return this.callbackReady;
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
