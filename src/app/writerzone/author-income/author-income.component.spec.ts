import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorIncomeComponent } from './author-income.component';

describe('AuthorIncomeComponent', () => {
  let component: AuthorIncomeComponent;
  let fixture: ComponentFixture<AuthorIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
