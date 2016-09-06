import { Component, Input, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { RequestBuilder } from '../../services/request.builder';
import { TemplateProvider } from '../../services/template.provider';
import { Http, Headers } from '@angular/http';
import { Validators } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Parameter, Type, Types } from '../../schema/2.0/swagger.schema';

@Component({
  selector: 'api-method-form',
  template: TemplateProvider.getTemplate('api-method-form') || `
    <form [formGroup]="requestForm" (submit)="performRequest()">
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
              <td *ngIf="parameter.type">
                <div class="form-group" [class.has-error]="requestForm.controls[parameter.name].invalid && !requestForm.controls[parameter.name].pristine">
                  <input [formControlName]="parameter.name" [name]="parameter.name" class="form-control" />
                </div>
              </td>
              <td *ngIf="parameter.schema">
                <div class="form-group" [class.has-error]="requestForm.controls[parameter.name].invalid && !requestForm.controls[parameter.name].pristine">
                  <textarea [formControlName]="parameter.name" [name]="parameter.name" class="form-control"></textarea>
                </div>
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
      <button type="submit" class="btn btn-primary" [disabled]="requestForm.invalid || true">Try it out! (not working atm)</button>
    </form>
  `,
  styles: [
    'textarea { width: 300px; height: 200px;}',
    'input { width: 300px}'
  ]
})

export class ApiMethodFormComponent implements OnInit {
  @Input() parameters: Parameter[];
  @Input() verb: string;
  @Input() urlTemplate: string;
  @Input() consumes: string[] = [];

  requestForm: FormGroup;

  values: { [id: string]: any } = {}

  constructor(
    private _http: Http,
    private _requestBuilder: RequestBuilder,
    private _formBuilder: FormBuilder,
    private _errorService: ErrorService) {

  }

  ngOnInit() {
    let definition: { [key: string]: any } = {};
    if(this.parameters) {
      for(let parameter of this.parameters) {
        definition[parameter.name] = [''];
        if(parameter.required) {
          definition[parameter.name].push(Validators.required);
        }
      }
    }
    this.requestForm = this._formBuilder.group(definition);
  }

  // getInputType(type: Type): string {
  //   switch(type) {
  //     case Types.number:
  //     case Types.integer: return 'number';
  //
  //     case Types.string:
  //     default: return 'text';
  //   }
  // }

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
  }
}
