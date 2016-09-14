import { Component, Input, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { RequestBuilder } from '../../services/request.builder';
import { HttpService } from '../../services/http.service';
import { TemplateProvider } from '../../services/template.provider';
import { Http, Headers } from '@angular/http';
import { Validators } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Parameter, Type, Types } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'api-method-form',
  template: TemplateProvider.getTemplate('api-method-form') || `
    <form [formGroup]="requestForm" (submit)="performRequest()" novalidate>
      <h4>Parameters</h4>
      <div *ngIf="parameters">
        <table class="table table-condensed">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Description</th>
              <th>Location</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngIf="parameters.length == 0">
              <td colspan="5" class="text-center">No parameters</td>
            </tr>
            <tr *ngFor="let parameter of parameters">
              <td *ngIf="!parameter.required">{{parameter.name}}</td>
              <td *ngIf="parameter.required"><strong>{{parameter.name}}</strong></td>
              <td>
                <api-method-form-control [form]="requestForm" [parameter]="parameter"></api-method-form-control>
              </td>
              <td *ngIf="!parameter.required">{{parameter.description}}</td>
              <td *ngIf="parameter.required"><strong>{{parameter.description}}</strong></td>
              <td>{{parameter.in}}</td>
              <td *ngIf="parameter.type">{{parameter.type}}</td>
              <td *ngIf="parameter.schema">
                <api-model [schema]="parameter.schema"></api-model>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Try it out!</button>
    </form>
  `
})

export class ApiMethodFormComponent implements OnInit {
  @Input() parameters: Parameter[];
  @Input() method: string;
  @Input() urlTemplate: string;
  @Input() consumes: string[] = [];

  requestForm: FormGroup;
  values: { [id: string]: any } = {}

  constructor(
    private _http: Http,
    private _requestBuilder: RequestBuilder,
    private _httpService: HttpService,
    private _formBuilder: FormBuilder,
    private _errorService: ErrorService) {

  }

  ngOnInit() {
    // Build base form
    let definition: { [key: string]: any } = {};
    if(this.parameters) {
      for(let parameter of this.parameters) {
        definition[parameter.name] = [''];
      }
    }
    this.requestForm = this._formBuilder.group(definition);
    console.log(this.requestForm);
  }

  performRequest() {
    if(this.requestForm.invalid) {
      for(let key in this.requestForm.controls) {
        let control = this.requestForm.controls[key];
        if(control.invalid) {
          for(let validator in control.errors) {
            if(control.errors[validator]){
              this._errorService.setError(`Control '${key}' failed '${validator}' validation`);
            }
          }
        }
      }
      return;
    }
    let request = this._requestBuilder.generateRequest(this.urlTemplate, this.method, this.requestForm.value, this.parameters);
    this._httpService.dispatch(request);
  }
}
