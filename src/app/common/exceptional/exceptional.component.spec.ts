import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionalComponent } from './exceptional.component';

describe('ExceptionalComponent', () => {
  let component: ExceptionalComponent;
  let fixture: ComponentFixture<ExceptionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceptionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
