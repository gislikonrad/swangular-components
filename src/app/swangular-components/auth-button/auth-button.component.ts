import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SecuritySchemeType, SecurityScheme, Swagger } from "swagger-schema-ts";
import { SwaggerService } from "../services/swagger.service";
import { OAuthService } from "../services/o-auth.service";

@Component({
  selector: 'api-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit, OnDestroy {
  @Input() security: { [id: string]: string[] }[];
  @Input() swagger: Swagger;

  scopes: string[];

  private _authorizationUrl: string;
  private _deauthorizationUrl: string;
  private _sub: any;

  constructor(
    private _authService: OAuthService,
    private _swaggerService: SwaggerService) {
  }

  canSignIn(): boolean {
    return !!this._authorizationUrl && this._authService.canSignIn();
  }

  canSignOut(): boolean {
    return !!this._deauthorizationUrl && this.isSignedIn();
  }

  isSignedIn(): boolean {
    return this._authService.isSignedIn();
  }

  startSignIn() {
    let url = this._authService.generateSigninUrl(this._authorizationUrl, this.scopes || []);
    window.open(url, 'Authenticate for swangular', 'height=800,width=800');
  }

  startSignOut() {

  }

  clearToken() {
    this._authService.clearToken();
  }

  hasScope(scope: string): boolean {
    let scopes = this._authService.scopes;
    if(!scopes) {
      return false;
    }

    return scopes.indexOf(scope) > -1;
  }

  hasAllScopes(): boolean {
    let consented = this._authService.scopes;
    if(!consented) {
      return false;
    }
    for(let index in this.scopes) {
      if(consented.indexOf(this.scopes[index]) < 0) {
        return false;
      }
    }
    return true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.swagger && changes.swagger.currentValue) {
      this.update();
    }
  }

  ngOnInit() {
    // this._sub = this._swaggerService.current.subscribe(swagger => {
    //   this._securityDefinitions = swagger.securityDefinitions;
    //   this.update.apply(this);
    // });
  }

  ngOnDestroy() {
    // this._sub.unsubscribe();
  }

  private update() {
    if(!this.security || !this.swagger.securityDefinitions) {
      return;
    }
    for(let key in this.swagger.securityDefinitions) {
      let definition = this.swagger.securityDefinitions[key];
      if(definition.type != SecuritySchemeType.oauth2) {
        continue;
      }
      for(let index in this.security) {
        let security = this.security[index];
        let scopes = security[key];
        if(!scopes) {
          continue;
        }
        this.scopes = scopes;
        this._authorizationUrl = definition.authorizationUrl;
        return;
      }
    }
  }
}
