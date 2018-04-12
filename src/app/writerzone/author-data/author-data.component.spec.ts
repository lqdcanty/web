import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDataComponent } from './author-data.component';

describe('AuthorDataComponent', () => {
  let component: AuthorDataComponent;
  let fixture: ComponentFixture<AuthorDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
