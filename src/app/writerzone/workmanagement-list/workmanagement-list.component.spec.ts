import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkmanagementListComponent } from './workmanagement-list.component';

describe('WorkmanagementListComponent', () => {
  let component: WorkmanagementListComponent;
  let fixture: ComponentFixture<WorkmanagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkmanagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkmanagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
