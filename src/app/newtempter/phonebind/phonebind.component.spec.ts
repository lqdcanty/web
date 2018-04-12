import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonebindComponent } from './phonebind.component';

describe('PhonebindComponent', () => {
  let component: PhonebindComponent;
  let fixture: ComponentFixture<PhonebindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonebindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonebindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
