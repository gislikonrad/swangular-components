import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SwaggerComponent } from './swagger/swagger.component';
import { FirstPipe } from './pipes/first.pipe';
import { KeyValuePairsPipe } from './pipes/key-value-pairs.pipe';
import { AuthButtonComponent } from "./auth-button/auth-button.component";
import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";
import { ErrorPanelComponent } from "./error-panel/error-panel.component";
import { HttpMethodLabelComponent } from "./http-method-label/http-method-label.component";
import { HttpStatusLabelComponent } from "./http-status-label/http-status-label.component";
import { MethodComponent } from "./method/method.component";
import { MethodFormControlComponent } from "./method-form-control/method-form-control.component";
import { MethodResponseHeadersComponent } from "./method-response-headers/method-response-headers.component";
import { MethodResponsesComponent } from "./method-responses/method-responses.component";
import { ModelComponent } from "./model/model.component";
import { RequestModalComponent } from "./request-modal/request-modal.component";
import { SwaggerService } from "./services/swagger.service";
import { VarDirective } from './directives/var.directive';
import { ErrorService } from "./services/error.service";
import { MethodFormComponent } from './method-form/method-form.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormTextAreaComponent } from './form-text-area/form-text-area.component';
import { OAuthService } from "./services/o-auth.service";
import { DynamicRequestDispatcherService } from "./services/dynamic-request-dispatcher.service";
import { RequestBuilderService } from "./services/request-builder.service";
import { ApiKeyService } from "./services/api-key.service";
import { ModelSchemaComponent } from './model-schema/model-schema.component';
// import { TemplateForDirective } from './directives/template-for.directive';
// import { ReplaceTemplateDirective } from './directives/replace-template.directive';
// import { TemplateProviderService } from "./services/template-provider.service";

@NgModule({
  entryComponents: [    
    FormInputComponent,
    FormSelectComponent,
    FormTextAreaComponent
  ],
  declarations: [
    FirstPipe, 
    KeyValuePairsPipe, 
    
    SwaggerComponent, 
    AuthButtonComponent, 
    AuthCallbackComponent,
    ErrorPanelComponent,
    HttpMethodLabelComponent,
    HttpStatusLabelComponent,
    MethodComponent,
    MethodFormControlComponent,
    MethodResponseHeadersComponent,
    MethodResponsesComponent,
    ModelComponent,
    RequestModalComponent,
    VarDirective,
    MethodFormComponent,
    FormInputComponent,
    FormSelectComponent,
    FormTextAreaComponent,
    ModelSchemaComponent
    // TemplateForDirective,
    // ReplaceTemplateDirective
  ],
  exports: [
    SwaggerComponent, 
    AuthButtonComponent, 
    AuthCallbackComponent,
    ErrorPanelComponent,
    HttpMethodLabelComponent,
    HttpStatusLabelComponent,
    MethodComponent,
    MethodFormControlComponent,
    MethodResponseHeadersComponent,
    MethodResponsesComponent,
    ModelComponent,
    RequestModalComponent,
    MethodFormComponent,

    FirstPipe, 
    KeyValuePairsPipe, 

    // TemplateForDirective,
    // ReplaceTemplateDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [SwaggerService, ErrorService, OAuthService, DynamicRequestDispatcherService, RequestBuilderService, ApiKeyService],
  bootstrap: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})



export class SwangularComponentsModule { 
  static forRoot() {
    return {
      ngModule: SwangularComponentsModule,
      providers: [SwaggerService, ErrorService, OAuthService, DynamicRequestDispatcherService, RequestBuilderService, ApiKeyService/*, TemplateProviderService*/]
    };
  }
}
