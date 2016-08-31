import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ModuleWithProviders, provide, NgModule } from '@angular/core';

import { ApiSwaggerComponent } from './components/api-swagger/api-swagger.component';
import { ApiMethodComponent } from './components/api-method/api-method.component';

import { SwaggerService } from './services/swagger.service';

import { KeyValuePairsPipe } from './pipes/key-value-pairs.pipe';

export * from './services/template.provider';


export const SWANGULAR_COMPONENTS: any[] = [
  ApiSwaggerComponent,
  ApiMethodComponent,
  KeyValuePairsPipe
];

export const SWANGULAR_PROVIDERS: any[] = [
  SwaggerService
];

@NgModule({
    declarations: SWANGULAR_COMPONENTS,
    exports: SWANGULAR_COMPONENTS,
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
// export * from './components/api-swagger/api-swagger.component';
// export * from './components/api-method/api-method.component';
// export * from './services/swagger.service';
// export * from './schema/2.0/swagger.schema';
//
// export * from './swangular.module';
