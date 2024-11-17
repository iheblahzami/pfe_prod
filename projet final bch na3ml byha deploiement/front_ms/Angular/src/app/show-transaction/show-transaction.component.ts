import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../models/Transaction';
import { TransactionService } from '../services/TransactionServiceImpl';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './show-transaction.component.html',
  styleUrls: ['./show-transaction.component.css']
})
export class ShowTransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  transactionId!: number;
  transaction!: Transaction;
  transactions: Transaction[] = [];
  currentPage: number = 1; // Added for pagination
  itemsPerPage: number = 5; // Items per page
  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  onSubmit(): void {
  }

  getAllTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(
      (transactions: Transaction[]) => {
        this.transactions = transactions;
      },
      error => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
}
