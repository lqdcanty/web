import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterzoneComponent } from './writerzone.component';

describe('WriterzoneComponent', () => {
  let component: WriterzoneComponent;
  let fixture: ComponentFixture<WriterzoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriterzoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
