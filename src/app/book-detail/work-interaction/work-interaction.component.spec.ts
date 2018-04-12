import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkInteractionComponent } from './work-interaction.component';

describe('WorkInteractionComponent', () => {
  let component: WorkInteractionComponent;
  let fixture: ComponentFixture<WorkInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
