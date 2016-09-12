import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TemplateProvider } from '../../services/template.provider';
import { AuthService } from '../../services/auth.service';
import { SwaggerService } from '../../services/swagger.service';
import { SecurityScheme, SecuritySchemeTypes } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'auth-button',
  template: TemplateProvider.getTemplate('auth-button') || `
    <button type="button" class="btn btn-default btn-lg btn-block" [hidden]="!canSignIn()" (click)="startSignin()">Sign in</button>
    <div class="tooltip right" role="tooltip">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">
        Scopes required
        <ul>
          <li *ngFor="let scope of scopes">{{scope}}</li>
        </ul>
      </div>
    </div>
  `
})

export class AuthButtonComponent implements OnInit, OnDestroy {
  @Input() security: { [id: string]: string[] }[];

  private _authorizationUrl: string;
  scopes: string[];
  private _sub: any;
  private _securityDefinitions: { [id: string]: SecurityScheme };

  constructor(
    private _authService: AuthService,
    private _swaggerService: SwaggerService) {

  }

  canSignIn(): boolean {
    return !!this._authorizationUrl && this._authService.canSignIn();
  }

  startSignin() {
    let url = this._authService.generateSigninUrl(this._authorizationUrl, this.scopes || []);
    window.open(url, 'Authenticate for swangular', 'height=800,width=800');
  }

  ngOnInit() {
    this._sub = this._swaggerService.subscription.subscribe(swagger => {
      this._securityDefinitions = swagger.securityDefinitions;
      this.update.apply(this);
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  private update() {
    if(!this.security || !this._securityDefinitions) {
      return;
    }
    for(let key in this._securityDefinitions) {
      let definition = this._securityDefinitions[key];
      if(definition.type != SecuritySchemeTypes.oauth2) {
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
