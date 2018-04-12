import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewvolumeComponent } from './newvolume.component';

describe('NewvolumeComponent', () => {
  let component: NewvolumeComponent;
  let fixture: ComponentFixture<NewvolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewvolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewvolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
