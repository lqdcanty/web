import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomerankComponent } from './homerank.component';

describe('HomerankComponent', () => {
  let component: HomerankComponent;
  let fixture: ComponentFixture<HomerankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomerankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomerankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
