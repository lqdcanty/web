import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthornavComponent } from './authornav.component';

describe('AuthornavComponent', () => {
  let component: AuthornavComponent;
  let fixture: ComponentFixture<AuthornavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthornavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthornavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
