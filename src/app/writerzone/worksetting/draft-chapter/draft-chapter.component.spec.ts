import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftChapterComponent } from './draft-chapter.component';

describe('DraftChapterComponent', () => {
  let component: DraftChapterComponent;
  let fixture: ComponentFixture<DraftChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
