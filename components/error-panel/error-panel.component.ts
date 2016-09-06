import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { TemplateProvider } from '../../services/template.provider';

@Component({
  selector: 'error-panel',
  template: TemplateProvider.getTemplate('error-panel') || `
    <div class="alert alert-danger" role="alert" *ngIf="errors.length > 0">
      <button type="button" class="close" aria-label="Close" (click)="clearErrors()"><span aria-hidden="true">&times;</span></button>
      <strong *ngIf="errors.length == 1">An error has occurred</strong>
      <strong *ngIf="errors.length > 1">Errors have occurred</strong>
      <p *ngIf="errors.length == 1">{{errors[0]}}</p>
      <ul *ngIf="errors.length > 1">
        <li *ngFor="let error of errors">{{error}}</li>
      </ul>
    </div>
  `
})

export class ErrorPanelComponent implements OnInit, OnDestroy {
  private _sub: any;
  errors: string[] = [];

  constructor(private errorService: ErrorService) {

  }

  clearErrors() {
    this.errors.length = 0;
  }

  ngOnInit() {
    this._sub = this.errorService.latestError.subscribe(error => {
      if(error) {
        this.errors.push(error);
      }
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
