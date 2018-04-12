import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatchapterComponent } from './creatchapter.component';

describe('CreatchapterComponent', () => {
  let component: CreatchapterComponent;
  let fixture: ComponentFixture<CreatchapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatchapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatchapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
