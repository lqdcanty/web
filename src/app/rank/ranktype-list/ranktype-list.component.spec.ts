import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RanktypeListComponent } from './ranktype-list.component';

describe('RanktypeListComponent', () => {
  let component: RanktypeListComponent;
  let fixture: ComponentFixture<RanktypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RanktypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RanktypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
