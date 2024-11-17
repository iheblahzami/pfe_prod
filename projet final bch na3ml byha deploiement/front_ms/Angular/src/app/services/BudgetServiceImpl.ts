import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Budget} from "../models/Budget";
import {catchError} from "rxjs/operators";
import {Transaction} from "../models/Transaction";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServiceBudget {
 private baseUrl = 'http://40.78.53.235:8000/budget';
   //private baseUrl = 'http://127.0.0.1:8000/budget';


  constructor(private http: HttpClient) { }

  // Get all budgets
  getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.baseUrl}`);
  }

  // Get a budget by ID
  getBudget(id: number): Observable<Budget> {
    return this.http.get<Budget>(`${this.baseUrl}/${id}`);
  }

  // Create a new budget
  createBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.baseUrl}/add`, budget);
  }

  // Update an existing budget
  updateBudget(id: number, budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.baseUrl}/${id}/edit`, budget);
  }

  // Delete a budget by ID
  deleteBudget(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


  // Get budgets by month
  getBudgetsByMonth(month: string): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.baseUrl}/budgets/${month}`);
  }

  addBudgetWithMonth(newBudgetData: any, month: string): Observable<any> {
    const url = `${this.baseUrl}/add/${month}`;
    return this.http.post<any>(url, newBudgetData)
      .pipe(
        catchError(this.handleError)
      );


  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  // Fetch transactions for a specific budget
  getTransactionsForBudget(budgetId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/${budgetId}/transactions`);
  }


  // Method to fetch the name of the budget by its ID
  // Method to get a budget by its name
  getBudgetByName(name: string): Observable<Budget> {
    return this.http.get<Budget>(`${this.baseUrl}/${name}`);
  }
}
