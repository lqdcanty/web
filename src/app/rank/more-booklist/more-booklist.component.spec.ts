import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreBooklistComponent } from './more-booklist.component';

describe('MoreBooklistComponent', () => {
  let component: MoreBooklistComponent;
  let fixture: ComponentFixture<MoreBooklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreBooklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreBooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
