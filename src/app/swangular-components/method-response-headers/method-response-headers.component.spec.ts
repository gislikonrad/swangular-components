import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodResponseHeadersComponent } from './method-response-headers.component';

describe('MethodResponseHeadersComponent', () => {
  let component: MethodResponseHeadersComponent;
  let fixture: ComponentFixture<MethodResponseHeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodResponseHeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodResponseHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
