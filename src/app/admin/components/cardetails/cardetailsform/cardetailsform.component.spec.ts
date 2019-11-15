import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardetailsformComponent } from './cardetailsform.component';

describe('CardetailsformComponent', () => {
  let component: CardetailsformComponent;
  let fixture: ComponentFixture<CardetailsformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardetailsformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardetailsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
