import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBudgetByIdComponent } from './show-budget-by-id.component';

describe('ShowBudgetByIdComponent', () => {
  let component: ShowBudgetByIdComponent;
  let fixture: ComponentFixture<ShowBudgetByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBudgetByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBudgetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
