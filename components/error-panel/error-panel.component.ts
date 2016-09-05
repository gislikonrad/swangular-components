import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { TemplateProvider } from '../../services/template.provider';

@Component({
  selector: 'error-panel',
  template: TemplateProvider.errorPanel
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
