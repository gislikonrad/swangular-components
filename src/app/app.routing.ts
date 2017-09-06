import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "app/home/home.component";
import { DemoComponent } from "app/demo/demo.component";

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'demo', component: DemoComponent },
  { path: '**', redirectTo: '' } // maybe a fuax-o-fuax (404) site :D
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { 
  static forRoot() {
    return {
      ngModule: AppRoutingModule,
      imports: [RouterModule.forRoot(routes)]
    };
  }
}  