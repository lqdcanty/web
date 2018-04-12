import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatworkComponent } from './creatwork.component';

describe('CreatworkComponent', () => {
  let component: CreatworkComponent;
  let fixture: ComponentFixture<CreatworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
