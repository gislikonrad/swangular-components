import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodFormComponent } from './method-form.component';

describe('MethodFormComponent', () => {
  let component: MethodFormComponent;
  let fixture: ComponentFixture<MethodFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
