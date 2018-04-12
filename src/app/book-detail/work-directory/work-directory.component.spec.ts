import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDirectoryComponent } from './work-directory.component';

describe('WorkDirectoryComponent', () => {
  let component: WorkDirectoryComponent;
  let fixture: ComponentFixture<WorkDirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkDirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
