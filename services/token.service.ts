export class TokenService {
  private _response: OauthResponse;

  get tokenType(): string {
    if(!this._response) {
      return null;
    }
    return this._response.token_type;
  }

  get accessToken(): string {
    if(!this._response) {
      return null;
    }
    return this._response.access_token;
  }

  setOauthResponse(response: OauthResponse) {
    this._response = response;
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
}
