import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodFormControlComponent } from './method-form-control.component';

describe('MethodFormControlComponent', () => {
  let component: MethodFormControlComponent;
  let fixture: ComponentFixture<MethodFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
