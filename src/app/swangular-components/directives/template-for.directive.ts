// import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
// import { TemplateProviderService } from "../services/template-provider.service";

// @Directive({
//   selector: '[templateFor]'
// })
// export class TemplateForDirective {

//   constructor(
//     private _templateProvider: TemplateProviderService,
//     private _templateRef: TemplateRef<any>
//   ) { 
//     }

//     @Input() set templateFor(t: string) {
//       this._templateProvider.add(t, this._templateRef);
//     }
// }