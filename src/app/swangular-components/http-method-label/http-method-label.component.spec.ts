import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpMethodLabelComponent } from './http-method-label.component';

describe('HttpMethodLabelComponent', () => {
  let component: HttpMethodLabelComponent;
  let fixture: ComponentFixture<HttpMethodLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpMethodLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpMethodLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
