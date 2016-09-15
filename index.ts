import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ApiSwaggerComponent } from './components/api-swagger/api-swagger.component';
export { ApiSwaggerComponent } from './components/api-swagger/api-swagger.component';
import { ApiMethodComponent } from './components/api-method/api-method.component';
export { ApiMethodComponent } from './components/api-method/api-method.component';
import { ApiMethodResponsesComponent } from './components/api-method-responses/api-method-responses.component';
export { ApiMethodResponsesComponent } from './components/api-method-responses/api-method-responses.component';
import { ApiMethodResponseHeadersComponent } from './components/api-method-response-headers/api-method-response-headers.component';
export { ApiMethodResponseHeadersComponent } from './components/api-method-response-headers/api-method-response-headers.component';
import { ApiModelComponent } from './components/api-model/api-model.component';
export { ApiModelComponent } from './components/api-model/api-model.component';
import { ApiMethodFormComponent } from './components/api-method-form/api-method-form.component';
export { ApiMethodFormComponent } from './components/api-method-form/api-method-form.component';
import { ApiMethodFormControlComponent, FORM_CONTROLS } from './components/api-method-form-control/api-method-form-control.component';
export { ApiMethodFormControlComponent } from './components/api-method-form-control/api-method-form-control.component';
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

const ENTRY_COMPONENTS: any[] = [
    ...FORM_CONTROLS
];

export const SWANGULAR_COMPONENTS: any[] = [
  ApiSwaggerComponent,
  ApiMethodComponent,
  ApiMethodResponsesComponent,
  ApiModelComponent,
  ErrorPanelComponent,
  ApiMethodFormComponent,
  ApiMethodFormControlComponent,
  ApiRequestModalComponent,
  HttpMethodLabelComponent,
  HttpStatusLabelComponent,
  AuthCallbackComponent,
  AuthButtonComponent,
  ApiMethodResponseHeadersComponent,
  ...ENTRY_COMPONENTS
];

export const SWANGULAR_PROVIDERS: any[] = [
  SwaggerService,
  ErrorService,
  RequestBuilder,
  ApiKeyProvider,
  HttpService,
  AuthService
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
    ],
    entryComponents: ENTRY_COMPONENTS
})
export class SwangularModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SwangularModule,
      providers: SWANGULAR_PROVIDERS
    };
  }
}
