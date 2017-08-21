import { Component, OnInit } from '@angular/core';
import { ErrorService } from "../services/error.service";

@Component({
  selector: 'api-error-panel',
  templateUrl: './error-panel.component.html',
  styleUrls: ['./error-panel.component.css']
})
export class ErrorPanelComponent implements OnInit {
  
  private _sub: any;
  errors: string[] = [];

  constructor(private _errorService: ErrorService) {
  }

  clearErrors() {
    this.errors.length = 0;
    this._errorService.clearErrors();
  }

  ngOnInit() {
    this._sub = this._errorService.latestError.subscribe(error => {
      if(error) {
        this.errors.push(error);
      }
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
