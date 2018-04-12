import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkmodifyComponent } from './workmodify.component';

describe('WorkmodifyComponent', () => {
  let component: WorkmodifyComponent;
  let fixture: ComponentFixture<WorkmodifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkmodifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkmodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
