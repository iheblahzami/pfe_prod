import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../services/TransactionServiceImpl';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Transaction } from '../models/Transaction';
import {ServiceBudget} from "../services/BudgetServiceImpl";
import {Budget} from "../models/Budget"; // Import Transaction model

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  transactionForm: FormGroup;
  selectedBudgetId: number | null = null;
  transactions: Transaction[] = [];
  editingTransaction: boolean = false;
  selectedTransactionId: number | null = null;
  selectedBudgetName: string = ''; // Assuming you have access to the name of the selected budget
  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router,
    private budgetService: ServiceBudget  // Inject your budget service
  ) {
    this.transactionForm = this.formBuilder.group({
      nomtransaction: ['', Validators.required],
      montantTransaction: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      this.selectedBudgetId = +params['budgetId'];
      if (this.selectedBudgetId !== null) {
        this.fetchTransactionsForBudget(this.selectedBudgetId);
      }
    });

    this.route.params.subscribe(params => {
      this.selectedBudgetId = +params['budgetId'];
      if (this.selectedBudgetId !== null) {
        this.fetchTransactionsForBudget(this.selectedBudgetId);

        // Call your service method to get the selected budget name
        this.budgetService.getBudgetByName(this.selectedBudgetId.toString()).subscribe(
          (budget: Budget) => {
            this.selectedBudgetName = budget.nomBudget; // Assuming 'nomBudget' is the property containing the budget name
          },
          error => {
            console.error('Error fetching selected budget name:', error);
          }
        );
      }
    });

  }


  ngOnInit(): void {
    if (this.selectedBudgetId !== null) {
      this.fetchTransactionsForBudget(this.selectedBudgetId);
    }
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      return;
    }

    if (this.selectedBudgetId === null) {
      console.error('No budget selected for the transaction.');
      return;
    }

    if (this.editingTransaction) {
      this.transactionService.updateTransaction(this.selectedTransactionId!, this.transactionForm.value).subscribe(
        () => {
          const index = this.transactions.findIndex(transaction => transaction.id === this.selectedTransactionId);
          if (index !== -1) {
            this.transactions[index] = { ...this.transactionForm.value, id: this.selectedTransactionId! };
          }
          this.transactionForm.reset();
          this.editingTransaction = false;
          this.selectedTransactionId = null;
          Swal.fire('Success', 'Transaction updated successfully', 'success');
        },
        error => {
          Swal.fire('Error', 'Error updating Transaction', 'error');
          console.error('Error updating Transaction:', error);
        }
      );
    } else {
      this.transactionService.addTransactionToBudget(this.selectedBudgetId, this.transactionForm.value).subscribe(
        () => {
          Swal.fire('Success', 'Transaction added successfully', 'success');
          if (this.selectedBudgetId !== null) {
            this.fetchTransactionsForBudget(this.selectedBudgetId);
          }
        },
        error => {
          Swal.fire('Error', 'Error adding Transaction', 'error');
          console.error('Error adding Transaction:', error);
        }
      );
    }
  }

  fetchTransactionsForBudget(budgetId: number): void {
    this.transactionService.getTransactionsForBudget(budgetId).subscribe(
      (transactions: Transaction[]) => {
        this.transactions = transactions;
      },
      error => {
        console.error('Error fetching transactions for budget:', error);
      }
    );
  }

  deleteTransaction(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this transaction!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.transactionService.deleteTransaction(id).subscribe(() => {
          this.transactions = this.transactions.filter(transaction => transaction.id !== id);
          Swal.fire('Success', 'Transaction deleted successfully', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your transaction is safe :)', 'info');
      }
    });
  }

  updateTransaction(transaction: Transaction): void {
    this.transactionForm.patchValue({
      nomtransaction: transaction.nomtransaction,
      montantTransaction: transaction.montantTransaction
    });
    this.editingTransaction = true;
    this.selectedTransactionId = transaction.id!;
  }



  cancelUpdate(): void {
    this.transactionForm.reset();
    this.editingTransaction = false;
    this.selectedTransactionId = null;
  }

  goBack(): void {
    this.router.navigate(['/showincomes'], { relativeTo: this.route });
  }

  calculateTotalAmount(): number {
    let totalAmount = 0;
    this.transactions.forEach(transaction => {
      totalAmount += transaction.montantTransaction;
    });
    return totalAmount;
  }






}
