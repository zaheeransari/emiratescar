import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarproductformComponent } from './carproductform.component';

describe('CarproductformComponent', () => {
  let component: CarproductformComponent;
  let fixture: ComponentFixture<CarproductformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarproductformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarproductformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
