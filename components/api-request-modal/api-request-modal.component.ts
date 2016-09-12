import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { TemplateProvider } from '../../services/template.provider';
import { Request, Response, RequestMethod } from '@angular/http';

@Component({
  selector: 'api-request-modal',
  template: TemplateProvider.getTemplate('api-request-modal') || `
  <div class="modal" id="myModal" tabindex="-1" [style.display]="'block'" *ngIf="request">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header"
             [class.bg-info]="request.method == 0"
             [class.bg-success]="request.method == 1"
             [class.bg-warning]="request.method == 2 || request.method == 6"
             [class.bg-danger]="request.method == 3">
          <button type="button" class="close" (click)="close()"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Performing request  <http-method-label [method]="request.method"></http-method-label><small>{{request.url}}</small></h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <h3>Request</h3>
              <h4>Headers</h4>
              <table class="table table-condensed">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let key of request.headers.keys()">
                    <td>{{key}}</td>
                    <td [title]="request.headers.get(key)">{{request.headers.get(key)}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-6" *ngIf="response">
              <h3>Response <http-status-label [status]="response.statusText" [statusCode]="response.status"></http-status-label></h3>
              <h4>Headers</h4>
              <table class="table table-condensed">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let key of response.headers.keys()">
                    <td>{{key}}</td>
                    <td [title]="response.headers.get(key)">{{response.headers.get(key)}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h4 *ngIf="request._body">Body</h4>
              <pre *ngIf="request._body" style="overflow-y:scroll; height:300px">{{request._body | json}}</pre>
            </div>
            <div class="col-md-6" *ngIf="response">
              <h4 *ngIf="response._body">Body</h4>
              <pre *ngIf="response._body" style="overflow-y:scroll; height:300px">{{response._body | json}}</pre>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" (click)="close()">Close</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade in" *ngIf="request"></div>
  `,
  styles: [
    '.table>tbody>tr>td:nth-child(2) { white-space:nowrap; overflow:hidden; max-width:250px; }' // don't know why max-width: 1px works, it just does
  ]
})

export class ApiRequestModalComponent implements OnInit, OnDestroy {
  private _requestSub: any;
  private _responseSub: any;

  request: Request;
  response: Response;

  constructor(private _httpService: HttpService) {

  }

  close() {
    this._httpService.clear();
  }

  ngOnInit() {
    this._requestSub = this._httpService.request.subscribe(request => this.request = request);
    this._responseSub = this._httpService.response.subscribe(response => this.response = response);
  }

  ngOnDestroy() {
    this._requestSub.unsubscribe();
    this._responseSub.unsubscribe();
  }

  getRequestMethodString(method: RequestMethod): string {
    switch(method) {
      case RequestMethod.Head: return 'head';
      case RequestMethod.Delete: return 'delete';
      case RequestMethod.Patch: return 'patch';
      case RequestMethod.Options: return 'options';
      case RequestMethod.Put: return 'Put';
      case RequestMethod.Post: return 'post';
      case RequestMethod.Get:
      default: return 'get';
    }
  }
}
