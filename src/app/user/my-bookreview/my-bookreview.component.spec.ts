import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookreviewComponent } from './my-bookreview.component';

describe('MyBookreviewComponent', () => {
  let component: MyBookreviewComponent;
  let fixture: ComponentFixture<MyBookreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBookreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
