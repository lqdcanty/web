import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentLayerComponent } from './comment-layer.component';

describe('CommentLayerComponent', () => {
  let component: CommentLayerComponent;
  let fixture: ComponentFixture<CommentLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
