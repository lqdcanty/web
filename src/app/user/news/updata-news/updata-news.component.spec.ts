import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdataNewsComponent } from './updata-news.component';

describe('UpdataNewsComponent', () => {
  let component: UpdataNewsComponent;
  let fixture: ComponentFixture<UpdataNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdataNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdataNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
