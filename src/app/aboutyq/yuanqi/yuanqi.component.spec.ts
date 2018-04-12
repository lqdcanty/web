import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YuanqiComponent } from './yuanqi.component';

describe('YuanqiComponent', () => {
  let component: YuanqiComponent;
  let fixture: ComponentFixture<YuanqiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YuanqiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YuanqiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
