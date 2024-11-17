import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIncomeComponent } from './show-income.component';

describe('ShowIncomeComponent', () => {
  let component: ShowIncomeComponent;
  let fixture: ComponentFixture<ShowIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
