# swangular-components ![alt text](https://api.travis-ci.org/gislikonrad/swangular-components.svg "build status")
swangular-components is a component library for angular 2.0.0 to render swagger 2.0 documentation.

## TODO
- [x] Create CI pipeline using Travis CI
- [x] Create base module
- [x] Fix for npm link
- [x] Add Output to api-swagger for debug purposes on swagger updates
- [x] Add more validation than just required
- [ ] Finish request builder
- [x] Add support for security property in swagger 2.0
- [ ] Make scheme selectable for the request if there are more than one
- [ ] Clean up auth service. It's not pretty.
- [x] Show enumerations of enums.
- [ ] Add support for arrays in dynamic forms
- [ ] Add unit tests
- [ ] Refactor into better components
- [ ] Document more components and have more in depth documentation

## Usage
```
npm install swangular-components --save
```

### Import in NgModule
```ts
  import { NgModule }       from '@angular/core';
  import { BrowserModule  } from '@angular/platform-browser';
  import { AppComponent }   from './components/app.component';

  import { FormsModule } from '@angular/forms';
  import { HttpModule } from '@angular/http';

  import { SwangularComponentsModule } from 'swangular-components';

  @NgModule({
      declarations: [
        AppComponent
      ],
      imports:      [
        BrowserModule,
        HttpModule,
        FormsModule,
        SwangularComponentsModule.forRoot()
      ],
      bootstrap:    [AppComponent]
  })
  export class AppModule {}
```

## Components

### error-panel
error-panel is an optional component that can show errors
```html
<error-panel></error-panel>
```

### api-swagger
api-swagger is the root of the tree. If you use this element, it basically injects a whole swagger page.
```html
<api-swagger url="http://a-valid-swagger/endpoint"></api-swagger>
```

### api-method
api-method is for showing what a url-verb combo does, i.e GET - /values
```html
<api-method [operation]="operationObject" verb="get" urlTemplate="/values/{id}"></api-method>
```

### api-model
api-model is for showing the schema and example of a request or response model
```html
<api-model [schema]="schemaObject"></api-swagger>
```

## Providers

There are a couple of injectable providers that can be used.

### SwaggerService
SwaggerService should be used to make a request to a swagger 2.0 endpoint.

### ErrorService
Any errors reported into this service get put into the error panel.

### ApiKeyService
Provide an api key to be used to call services that require an api key. This api key will also be used as the clientId for OAuth2 requests.

### OAuthService
Provide an api key to be used to call services that require an api key. This api key will also be used as the clientId for OAuth2 requests.
