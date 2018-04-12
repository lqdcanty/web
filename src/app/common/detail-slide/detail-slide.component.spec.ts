import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSlideComponent } from './detail-slide.component';

describe('DetailSlideComponent', () => {
  let component: DetailSlideComponent;
  let fixture: ComponentFixture<DetailSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
