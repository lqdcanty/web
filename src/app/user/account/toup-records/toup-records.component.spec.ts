import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToupRecordsComponent } from './toup-records.component';

describe('ToupRecordsComponent', () => {
  let component: ToupRecordsComponent;
  let fixture: ComponentFixture<ToupRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToupRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToupRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
