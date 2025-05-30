import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ErrorService } from "../services/error.service";
import { RequestBuilderService } from "../services/request-builder.service";
import { DynamicRequestDispatcherService } from "../services/dynamic-request-dispatcher.service";
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
type Document = OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;
type Parameter = OpenAPIV2.Parameter | OpenAPIV3.ParameterObject | OpenAPIV3_1.ParameterObject;

@Component({
  selector: 'api-method-form',
  templateUrl: './method-form.component.html',
  styleUrls: ['./method-form.component.css']
})
export class MethodFormComponent implements OnInit {
  @Input() parameters: Parameter[];
  @Input() method: string;
  @Input() urlTemplate: string;
  @Input() consumes: string[] = [];
  @Input() document: Document;

  requestForm: FormGroup;
  values: { [id: string]: any } = {}

  constructor(   
    private _errorService: ErrorService, 
    private _requestBuilder: RequestBuilderService,
    private _dynamicRequestDispatcher: DynamicRequestDispatcherService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    let definition: { [key: string]: any } = {};
    if(this.parameters) {
      for(let parameter of this.parameters) {
        definition[parameter.name] = [''];
      }
    }
    this.requestForm = this._formBuilder.group(definition);
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
    let request = this._requestBuilder.generateRequest(this.document, this.urlTemplate, this.method, this.requestForm.value, this.parameters);
    this._dynamicRequestDispatcher.dispatch(request);
  }
}
