import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedChapterComponent } from './published-chapter.component';

describe('PublishedChapterComponent', () => {
  let component: PublishedChapterComponent;
  let fixture: ComponentFixture<PublishedChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
