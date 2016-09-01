# swangular-components ![alt text](https://api.travis-ci.org/gislikonrad/swangular-components.svg "build status")
swangular-components is a component library for angular 2.0.0-rc.5 to render swagger 2.0 documentation.

## TODO
- [x] Create CI pipeline using Travis CI
- [x] Create base module
- [ ] Fix for npm link

## Usage
```
npm install swangular-components --save
```

### Changes in systemjs.config.js
```
  var map = {
    'app':                        'dist',

    '@angular':                   'node_modules/@angular',
    'rxjs':                       'node_modules/rxjs',

    'swangular-components':       'node_modules/swangular-components'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'boot.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },

    'swangular-components':       { main: 'index.js', defaultExtension: 'js'}
  };
```

### Import in NgModule
```ts
  import { NgModule }       from '@angular/core';
  import { BrowserModule  } from '@angular/platform-browser';
  import { AppComponent }   from './components/app.component';

  import { FormsModule } from '@angular/forms';
  import { HttpModule } from '@angular/http';

  import { SwangularModule } from 'swangular-components';

  @NgModule({
      declarations: [
        AppComponent
      ],
      imports:      [
        BrowserModule,
        HttpModule,
        FormsModule,
        routes,
        SwangularModule.forRoot()
      ],
      bootstrap:    [AppComponent]
  })
  export class AppModule {}
```

## Components

### api-swagger
api-swagger is the root of the tree. If you use this element, it basically injects a whole swagger page.

```html
<api-swagger url="http://a-valid-swagger/endpoint"></api-swagger>
```

### api-method
api-method is for showing what a url-verb combo does, i.e GET - /values
```html
<api-method operation="{{operationObject}}" verb="get" urlTemplate="/values/{id}"></api-swagger>
```
