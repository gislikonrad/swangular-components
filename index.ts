import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ModuleWithProviders, provide, NgModule } from '@angular/core';

import { ApiSwaggerComponent } from './components/api-swagger/api-swagger.component';
export { ApiSwaggerComponent } from './components/api-swagger/api-swagger.component';
import { ApiMethodComponent } from './components/api-method/api-method.component';
export { ApiMethodComponent } from './components/api-method/api-method.component';
import { ApiMethodResponsesComponent } from './components/api-method-responses/api-method-responses.component';
export { ApiMethodResponsesComponent } from './components/api-method-responses/api-method-responses.component';
import { ApiModelComponent } from './components/api-model/api-model.component';
export { ApiModelComponent } from './components/api-model/api-model.component';
import { ErrorPanelComponent } from './components/error-panel/error-panel.component';
export { ErrorPanelComponent } from './components/error-panel/error-panel.component';

import { SwaggerService } from './services/swagger.service';
export { SwaggerService } from './services/swagger.service';
import { ErrorService } from './services/error.service';
export { ErrorService } from './services/error.service';

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
  ErrorPanelComponent
];

export const SWANGULAR_PROVIDERS: any[] = [
  SwaggerService,
  ErrorService
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
      HttpModule
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
