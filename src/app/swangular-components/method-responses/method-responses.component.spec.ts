import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodResponsesComponent } from './method-responses.component';

describe('MethodResponsesComponent', () => {
  let component: MethodResponsesComponent;
  let fixture: ComponentFixture<MethodResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
