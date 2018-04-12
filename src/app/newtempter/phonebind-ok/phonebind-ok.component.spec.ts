import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonebindOkComponent } from './phonebind-ok.component';

describe('PhonebindOkComponent', () => {
  let component: PhonebindOkComponent;
  let fixture: ComponentFixture<PhonebindOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonebindOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonebindOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
