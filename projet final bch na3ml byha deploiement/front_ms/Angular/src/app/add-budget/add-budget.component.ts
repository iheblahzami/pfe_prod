import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ServiceBudget } from "../services/BudgetServiceImpl";
import { Income } from "../models/Income";
import { IncomeService } from "../services/IncomeServiceImpl";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.css']
})
export class AddBudgetComponent implements OnInit {
  budgetForm: FormGroup;
  incomes: Income[] = []; // Store incomes here
  categories: string[] = ['Food', 'Housing', 'Transportation', 'Utilities', 'Healthcare', 'Entertainment', 'Education', 'Savings', 'Other'];
  selectedMonth: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private budgetService: ServiceBudget,
    private incomeService: IncomeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.budgetForm = this.formBuilder.group({
      nomBudget: ['', Validators.required],
      montantBudget: ['', Validators.required],
      incomeId: ['', Validators.required],
      categories: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedMonth = params['month'];
      if (this.selectedMonth) {
        this.fetchIncomes();
      }
    });
  }

  fetchIncomes(): void {
    this.incomeService.getIncomes().subscribe(
      (data: Income[]) => {
        this.incomes = data;
        // Pre-select the income month based on the selected month
        const selectedIncome = this.incomes.find(income => income.mois === this.selectedMonth);
        if (selectedIncome) {
          this.budgetForm.patchValue({
            incomeId: selectedIncome.id
          });
        }
      },
      error => {
        console.error('Error fetching incomes:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.budgetForm.invalid) {
      return;
    }

    // Include the selected month when creating the budget
    const newBudgetData = {
      ...this.budgetForm.value,
      mois: this.selectedMonth
    };

    this.budgetService.createBudget(newBudgetData).subscribe(
      () => {
        // Show success notification
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Budget added successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        // Reset the form
        this.budgetForm.reset();
        // Optionally, redirect or perform any other action upon successful addition
      },
      error => {
        // Show error notification
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error adding budget!',
          footer: error.message
        });
        console.error('Error adding budget:', error);
      }
    );
  }
  goBack(): void {
    this.router.navigate(['/showincomes']);
  }

}
