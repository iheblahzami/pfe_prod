import { Component, OnInit } from '@angular/core';
import { Income } from '../models/Income';
import { IncomeService } from "../services/IncomeServiceImpl";
import { Budget } from "../models/Budget";
import { ServiceBudget } from "../services/BudgetServiceImpl";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "../services/AuthService";

@Component({
  selector: 'app-show-income',
  templateUrl: './show-income.component.html',
  styleUrls: ['./show-income.component.css',
    '../../assets/css/sb-admin-2.min.css',
    '../../assets/vendor/fontawesome-free/css/all.min.css']
})
export class ShowIncomeComponent implements OnInit {
  incomes: Income[] = [];
  selectedMonth: string | null = null;
  budgets: Budget[] = [];


  constructor(private incomeService: IncomeService, private budgetService: ServiceBudget,    private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getIncomeList();
  }

  getIncomeList(): void {
    this.incomeService.getIncomes().subscribe(
      (data: Income[]) => {
        this.incomes = data;
      },
      error => {
        console.error('Error fetching income list:', error);
      }
    );
  }

  onSelectMonth(month: string): void {
    this.selectedMonth = month;
    // Fetch budgets associated with the selected month
    this.budgetService.getBudgetsByMonth(month).subscribe(
      (data: Budget[]) => {
        this.budgets = data;
      },
      error => {
        console.error('Error fetching budgets for selected month:', error);
      }
    );
  }

  onSelectBudget(selectedBudget: string): void {
    const budgetId = Number(selectedBudget);
    // Redirect to add-transaction component with the selected budget ID
    this.router.navigate(['/add', budgetId]);
  }

  onDeleteBudget(budgetId: number): void {
    // Call your budget service to delete the budget
    this.budgetService.deleteBudget(budgetId).subscribe(
      () => {
        // Filter out the deleted budget from the local array
        this.budgets = this.budgets.filter(budget => budget.id !== budgetId);
        Swal.fire('Success', 'Budget deleted successfully.', 'success');
      },
      error => {
        console.error('Error deleting budget:', error);
        Swal.fire('Error', 'Failed to delete budget.', 'error');
      }
    );
  }
  onAddBudget(): void {
    if (!this.selectedMonth) {
      // Handle if no month is selected
      return;
    }

    this.router.navigate(['/add-budget', { month: this.selectedMonth }]);
  }


  logout(): void {
    this.authService.logout();

  }
}
