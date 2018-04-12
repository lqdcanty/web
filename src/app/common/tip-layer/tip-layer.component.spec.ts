import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipLayerComponent } from './tip-layer.component';

describe('TipLayerComponent', () => {
  let component: TipLayerComponent;
  let fixture: ComponentFixture<TipLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
