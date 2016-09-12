import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, provide, NgModule } from '@angular/core';

import { ApiSwaggerComponent } from './components/api-swagger/api-swagger.component';
export { ApiSwaggerComponent } from './components/api-swagger/api-swagger.component';
import { ApiMethodComponent } from './components/api-method/api-method.component';
export { ApiMethodComponent } from './components/api-method/api-method.component';
import { ApiMethodResponsesComponent } from './components/api-method-responses/api-method-responses.component';
export { ApiMethodResponsesComponent } from './components/api-method-responses/api-method-responses.component';
import { ApiModelComponent } from './components/api-model/api-model.component';
export { ApiModelComponent } from './components/api-model/api-model.component';
import { ApiMethodFormComponent } from './components/api-method-form/api-method-form.component';
export { ApiMethodFormComponent } from './components/api-method-form/api-method-form.component';
import { ErrorPanelComponent } from './components/error-panel/error-panel.component';
export { ErrorPanelComponent } from './components/error-panel/error-panel.component';
import { ApiRequestModalComponent } from './components/api-request-modal/api-request-modal.component';
export { ApiRequestModalComponent } from './components/api-request-modal/api-request-modal.component';
import { HttpMethodLabelComponent } from './components/http-method-label/http-method-label.component';
export { HttpMethodLabelComponent } from './components/http-method-label/http-method-label.component';
import { HttpStatusLabelComponent } from './components/http-status-label/http-status-label.component';
export { HttpStatusLabelComponent } from './components/http-status-label/http-status-label.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
export { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
export { AuthButtonComponent } from './components/auth-button/auth-button.component';

import { SwaggerService } from './services/swagger.service';
export { SwaggerService } from './services/swagger.service';
import { ErrorService } from './services/error.service';
export { ErrorService } from './services/error.service';
import { AuthService } from './services/auth.service';
export { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
// export { TokenService } from './services/token.service';
import { ApiKeyProvider, ApiKeyLocation } from './services/api-key.provider';
export { ApiKeyProvider, ApiKeyLocation } from './services/api-key.provider';
import { RequestBuilder } from './services/request.builder';
import { HttpService } from './services/http.service';

import { KeyValuePairsPipe } from './pipes/key-value-pairs.pipe';
export { KeyValuePairsPipe } from './pipes/key-value-pairs.pipe';

import { VarDirective } from './directives/var.directive';
export { VarDirective } from './directives/var.directive';

export * from './services/template.provider';
export * from './schema/2.0/swagger.schema';

export const SWANGULAR_COMPONENTS: any[] = [
  ApiSwaggerComponent,
  ApiMethodComponent,
  ApiMethodResponsesComponent,
  ApiModelComponent,
  ErrorPanelComponent,
  ApiMethodFormComponent,
  ApiRequestModalComponent,
  HttpMethodLabelComponent,
  HttpStatusLabelComponent,
  AuthCallbackComponent,
  AuthButtonComponent
];

export const SWANGULAR_PROVIDERS: any[] = [
  SwaggerService,
  ErrorService,
  RequestBuilder,
  ApiKeyProvider,
  HttpService,
  AuthService,
  TokenService
];
@NgModule({
    declarations: [
      ...SWANGULAR_COMPONENTS,
      KeyValuePairsPipe,
      VarDirective
    ],
    exports: [
      ...SWANGULAR_COMPONENTS
    ],
    imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule
    ]
})
export class SwangularModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SwangularModule,
      providers: SWANGULAR_PROVIDERS
    };
  }
}
