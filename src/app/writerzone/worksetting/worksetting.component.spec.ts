import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksettingComponent } from './worksetting.component';

describe('WorksettingComponent', () => {
  let component: WorksettingComponent;
  let fixture: ComponentFixture<WorksettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
