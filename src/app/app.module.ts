import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SwangularComponentsModule } from "app/swangular-components/swangular-components.module";
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';
import { AppRoutingModule } from "app/app.routing";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule.forRoot(),
    SwangularComponentsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 