import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Transaction} from "../models/Transaction";
import {Budget} from "../models/Budget";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://40.78.54.17:8001/transaction';
  // private apiUrl = 'http://127.0.0.1:8001/transaction';

  constructor(private http: HttpClient) { }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/`);
  }

  getTransactionsForBudget(budgetId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/budgets/${budgetId}`);
  }


  addTransactionToBudget(budgetId: number, transactionForm: any): Observable<any> {
    // Make a POST request to the backend endpoint with the transaction data and budgetId
    return this.http.post<any>(`${this.apiUrl}/add/${budgetId}`, transactionForm);
  }



  updateTransaction(id: number, transactionData: Transaction): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit/${id}`, transactionData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  // New method to fetch budgets
  getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.apiUrl}/consume/getBudgets`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('API Error: ', error);
    return throwError('Something went wrong, please try again later.');
  }
}
