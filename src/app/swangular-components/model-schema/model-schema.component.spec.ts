import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSchemaComponent } from './model-schema.component';

describe('ModelSchemaComponent', () => {
  let component: ModelSchemaComponent;
  let fixture: ComponentFixture<ModelSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
