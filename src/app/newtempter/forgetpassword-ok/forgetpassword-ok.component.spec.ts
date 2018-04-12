import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpasswordOkComponent } from './forgetpassword-ok.component';

describe('ForgetpasswordOkComponent', () => {
  let component: ForgetpasswordOkComponent;
  let fixture: ComponentFixture<ForgetpasswordOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetpasswordOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetpasswordOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
