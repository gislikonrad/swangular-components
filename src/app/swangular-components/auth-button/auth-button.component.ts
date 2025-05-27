import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
import { OpenApiVersion, DocumentService } from "../services/document.service";
import { OAuthService } from "../services/o-auth.service";

@Component({
  selector: 'api-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit, OnDestroy {
  @Input() security: { [id: string]: string[] }[];
  @Input() document: OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;

  scopes: string[];

  private _authorizationUrl: string;
  private _deauthorizationUrl: string;
  private _sub: any;

  constructor(
    private _authService: OAuthService,
    private _DocumentService: DocumentService) {
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

  // ngOnChanges(changes: SimpleChanges) {
  //   if(changes.document && changes.document.currentValue) {
  //     this.update();
  //   }
  // }

  ngOnInit() {
    // this._sub = this._DocumentService.current.subscribe(swagger => {
    //   this._securityDefinitions = swagger.securityDefinitions;
    //   this.update.apply(this);
    // });
  }

  ngOnDestroy() {
    // this._sub.unsubscribe();
  }

  private update() {
    if(!this.security) {
      return;
    }    
    var version = this._DocumentService.getVersion(this.document);
    if(version == OpenApiVersion.V2) {
      this.updateSwagger(this.document as OpenAPIV2.Document);
    }
    else if(version == OpenApiVersion.V3) {
      this.updateOpenApi(this.document as OpenAPIV3.Document);
    }
    else if(version == OpenApiVersion.V3_1) {
      this.updateOpenApi(this.document as OpenAPIV3_1.Document);
    }
  }

  private updateOpenApi(swagger: OpenAPIV3.Document | OpenAPIV3_1.Document) {
    if(!swagger.components || !swagger.components.securitySchemes) {
      return;
    }
    
    throw new Error('Not implemented');
  }

  private updateSwagger(swagger: OpenAPIV2.Document) {
    if(!swagger.securityDefinitions) {
      return;
    }
    
    for(let key in swagger.securityDefinitions) {
      let definition = swagger.securityDefinitions[key];
      if(definition.type != 'oauth2') {
        continue;
      }
      for(let index in this.security) {
        let security = this.security[index];
        let scopes = security[key];
        if(!scopes) {
          continue;
        }
        this.scopes = scopes;
        var a: any = definition;
        this._authorizationUrl = a.authorizationUrl;
        return;
      }
    }
  }
}
