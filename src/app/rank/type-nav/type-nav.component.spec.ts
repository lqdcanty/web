import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeNavComponent } from './type-nav.component';

describe('TypeNavComponent', () => {
  let component: TypeNavComponent;
  let fixture: ComponentFixture<TypeNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
