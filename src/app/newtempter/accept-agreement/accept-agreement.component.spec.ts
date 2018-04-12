import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptAgreementComponent } from './accept-agreement.component';

describe('AcceptAgreementComponent', () => {
  let component: AcceptAgreementComponent;
  let fixture: ComponentFixture<AcceptAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
