import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechangePasswordComponent } from './rechange-password.component';

describe('RechangePasswordComponent', () => {
  let component: RechangePasswordComponent;
  let fixture: ComponentFixture<RechangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
