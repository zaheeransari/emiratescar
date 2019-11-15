import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercarlistComponent } from './usercarlist.component';

describe('UsercarlistComponent', () => {
  let component: UsercarlistComponent;
  let fixture: ComponentFixture<UsercarlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercarlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercarlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
