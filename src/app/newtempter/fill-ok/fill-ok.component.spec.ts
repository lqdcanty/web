import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillOkComponent } from './fill-ok.component';

describe('FillOkComponent', () => {
  let component: FillOkComponent;
  let fixture: ComponentFixture<FillOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
