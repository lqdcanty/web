import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInformationComponent } from './fill-information.component';

describe('FillInformationComponent', () => {
  let component: FillInformationComponent;
  let fixture: ComponentFixture<FillInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
