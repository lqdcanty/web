import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemNewsComponent } from './system-news.component';

describe('SystemNewsComponent', () => {
  let component: SystemNewsComponent;
  let fixture: ComponentFixture<SystemNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
