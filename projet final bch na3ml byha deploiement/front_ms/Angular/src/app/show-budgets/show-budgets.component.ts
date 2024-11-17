import { Component, OnInit } from '@angular/core';
import { Budget } from '../models/Budget';
import { ServiceBudget } from "../services/BudgetServiceImpl";
import { IncomeService } from "../services/IncomeServiceImpl";
import Swal from "sweetalert2";
import { Income } from '../models/Income';
import { Transaction } from '../models/Transaction';

@Component({
  selector: 'app-show-budgets',
  templateUrl: './show-budgets.component.html',
  styleUrls: ['./show-budgets.component.css']
})
export class ShowBudgetsComponent implements OnInit {
  budgets: Budget[] = [];
  incomesMap: { [key: number]: Income } = {};
  selectedBudgetTransactions: Transaction[] = [];
  totalMontantTransaction: number = 0;
  saving: number = 0; // Initialize saving
  selectedBudgetName: string = ''; // Add selectedBudgetName variable
  totalBudgetMontant: number = 0; // Add totalBudgetMontant variable
  currentPage: number = 1; // Added for pagination
  itemsPerPage: number = 5; // Items per page

  constructor(private budgetService: ServiceBudget, private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.getBudgets();
  }

  getBudgets(): void {
    this.budgetService.getBudgets().subscribe(
      (data: Budget[]) => {
        this.budgets = data;
        this.fetchIncomes();
      },
      error => {
        console.error('Error fetching budgets:', error);
      }
    );
  }

  fetchIncomes(): void {
    this.incomeService.getIncomes().subscribe(
      (incomes: Income[]) => {
        this.incomesMap = incomes.reduce((acc, income) => {
          acc[income.id] = income;
          return acc;
        }, {} as { [key: number]: Income });
      },
      error => {
        console.error('Error fetching incomes:', error);
      }
    );
  }

  onDeleteBudget(budgetId: number): void {
    this.budgetService.deleteBudget(budgetId).subscribe(
      () => {
        this.budgets = this.budgets.filter(budget => budget.id !== budgetId);
        Swal.fire('Success', 'Budget deleted successfully.', 'success');
      },
      error => {
        console.error('Error deleting budget:', error);
        Swal.fire('Error', 'Failed to delete budget.', 'error');
      }
    );
  }

  onSelectBudget(budgetId: number): void {
    const selectedBudget = this.budgets.find(budget => budget.id === budgetId);
    if (selectedBudget) {
      this.selectedBudgetName = selectedBudget.nomBudget; // Store selected budget name
      this.budgetService.getTransactionsForBudget(budgetId).subscribe(
        (transactions: Transaction[]) => {
          if (transactions.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'No Transactions Found',
              text: 'There are no transactions associated with this budget.',
              confirmButtonText: 'OK',
            });
          } else {
            this.selectedBudgetTransactions = transactions;
            this.calculateTotalMontantTransaction(); // Calculate total montant
            this.calculateSaving(); // Calculate saving
          }
        },
        error => {
          console.error('Error fetching transactions for budget:', error);
        }
      );
    }
  }

  calculateTotalMontantTransaction(): void {
    this.totalMontantTransaction = this.selectedBudgetTransactions.reduce((total, transaction) => {
      return total + transaction.montantTransaction;
    }, 0);
  }

  calculateSaving(): void {
    const selectedBudget = this.budgets.find(budget => budget.id === this.selectedBudgetTransactions[0].budgetId);
    if (selectedBudget) {
      console.log('Selected Budget:', selectedBudget); // Log the selected budget
      console.log('Total Montant Transaction:', this.totalMontantTransaction); // Log the total montant transaction
      this.saving = selectedBudget.montantBudget - this.totalMontantTransaction;
      if (this.saving < 0) {
        this.saving = -this.saving; // Convert negative saving to positive
      }
      console.log('Saving:', this.saving); // Log the saving value
    }
  }
}
