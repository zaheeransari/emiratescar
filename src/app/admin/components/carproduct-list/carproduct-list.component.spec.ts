import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarproductListComponent } from './carproduct-list.component';

describe('CarproductListComponent', () => {
  let component: CarproductListComponent;
  let fixture: ComponentFixture<CarproductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarproductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarproductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
