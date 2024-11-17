// src/app/services/income.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Income} from "../models/Income";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private apiUrl = 'http://40.78.53.235:8000/income';
  //  private apiUrl = 'http://127.0.0.1:8000/income';


  constructor(private http: HttpClient) {}

  getIncomes(): Observable<Income[]> {
    return this.http.get<Income[]>(this.apiUrl);
  }

  getIncome(id: number): Observable<Income> {
    return this.http.get<Income>(`${this.apiUrl}/${id}`);
  }

  createIncome(income: Income): Observable<Income> {
    return this.http.post<Income>(`${this.apiUrl}/new`, income);
  }

  updateIncome(id: number, income: Income): Observable<Income> {
    return this.http.put<Income>(`${this.apiUrl}/${id}/edit`, income);
  }

  deleteIncome(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
