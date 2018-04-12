import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOneslideComponent } from './home-oneslide.component';

describe('HomeOneslideComponent', () => {
  let component: HomeOneslideComponent;
  let fixture: ComponentFixture<HomeOneslideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOneslideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOneslideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
