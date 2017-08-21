import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpStatusLabelComponent } from './http-status-label.component';

describe('HttpStatusLabelComponent', () => {
  let component: HttpStatusLabelComponent;
  let fixture: ComponentFixture<HttpStatusLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpStatusLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpStatusLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
