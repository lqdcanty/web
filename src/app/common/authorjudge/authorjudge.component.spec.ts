import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorjudgeComponent } from './authorjudge.component';

describe('AuthorjudgeComponent', () => {
  let component: AuthorjudgeComponent;
  let fixture: ComponentFixture<AuthorjudgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorjudgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorjudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
