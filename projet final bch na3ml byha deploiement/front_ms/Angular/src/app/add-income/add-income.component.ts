import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeService } from "../services/IncomeServiceImpl";
import { Income } from "../models/Income";
import Swal from 'sweetalert2';
import { Observable } from "rxjs";
import { AuthService } from "../services/AuthService";

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {
  incomeForm!: FormGroup;
  incomes: Income[] = [];
  currentPage: number = 1; // Added for pagination
  itemsPerPage: number = 5; // Items per page

  constructor(private formBuilder: FormBuilder, private incomeService: IncomeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.incomeForm = this.formBuilder.group({
      mois: ['', Validators.required],
      montantIncome: [0, Validators.required]
    });
    this.loadIncomes();
  }

  loadIncomes(): void {
    this.incomeService.getIncomes().subscribe(
      (data: Income[]) => {
        this.incomes = data;
      },
      error => {
        console.error('Error fetching income list:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.incomeForm.valid) {
      const newMonth = this.incomeForm.value.mois;
      const existingMonth = this.incomes.find(income => income.mois === newMonth);
      if (existingMonth) {
        Swal.fire('Warning', 'This month already exists', 'warning');
      } else {
        this.incomeService.createIncome(this.incomeForm.value).subscribe(() => {
          this.incomeForm.reset();
          Swal.fire('Success', 'Income added successfully', 'success');
          this.loadIncomes();
        });
      }
    }
  }

  deleteIncome(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this income!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.incomeService.deleteIncome(id).subscribe(() => {
          this.incomes = this.incomes.filter(income => income.id !== id);
          Swal.fire('Success', 'Income deleted successfully', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your income is safe :)', 'info');
      }
    });
  }

  toggleEditMode(income: Income): void {
    income.editMode = !income.editMode; // Toggle the editMode property
  }

  updateincome(income: Income): void {
    this.incomeService.updateIncome(income.id, income).subscribe(() => {
        Swal.fire('Success', 'Income updated successfully', 'success');
        this.loadIncomes();
      },
      (error) => {
        console.error('Error updating income:', error);
        Swal.fire('Error', 'Failed to update income', 'error');
      }
    );
    income.editMode = false; // Turn off edit mode after saving changes
  }

  cancelEdit(income: Income): void {
    income.editMode = false; // Turn off edit mode
  }

  logout(): void {
    this.authService.logout();
  }
}
