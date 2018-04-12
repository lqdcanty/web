import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YuanqiParentComponent } from './yuanqi-parent.component';

describe('YuanqiParentComponent', () => {
  let component: YuanqiParentComponent;
  let fixture: ComponentFixture<YuanqiParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YuanqiParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YuanqiParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
