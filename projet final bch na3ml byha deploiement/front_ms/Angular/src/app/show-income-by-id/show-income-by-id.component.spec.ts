import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIncomeByIdComponent } from './show-income-by-id.component';

describe('ShowIncomeByIdComponent', () => {
  let component: ShowIncomeByIdComponent;
  let fixture: ComponentFixture<ShowIncomeByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowIncomeByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIncomeByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
