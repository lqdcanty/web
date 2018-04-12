import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YuanqiNavComponent } from './yuanqi-nav.component';

describe('YuanqiNavComponent', () => {
  let component: YuanqiNavComponent;
  let fixture: ComponentFixture<YuanqiNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YuanqiNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YuanqiNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
