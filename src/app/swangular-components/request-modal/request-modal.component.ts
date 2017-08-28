import { Component, OnInit, OnDestroy } from '@angular/core';
import { Request, Response, RequestMethod } from "@angular/http";
import { DynamicRequestDispatcherService } from "../services/dynamic-request-dispatcher.service";

@Component({
  selector: 'api-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.css']
})
export class RequestModalComponent implements OnInit, OnDestroy {
  private _requestSub: any;
  private _responseSub: any;

  request: Request;
  response: Response;

  constructor(private _requestDispatcher: DynamicRequestDispatcherService) {

  }

  close() {
    this._requestDispatcher.clear();
  }

  ngOnInit() {
    this._requestSub = this._requestDispatcher.request.subscribe(request => this.request = request);
    this._responseSub = this._requestDispatcher.response.subscribe(response => this.response = response);
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
      case RequestMethod.Put: return 'put';
      case RequestMethod.Post: return 'post';
      case RequestMethod.Get:
      default: return 'get';
    }
  }

}
