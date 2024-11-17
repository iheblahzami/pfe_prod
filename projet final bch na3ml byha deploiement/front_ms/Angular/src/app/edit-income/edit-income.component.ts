import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Income } from "../models/Income";
import { IncomeService } from "../services/IncomeServiceImpl";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.css']
})
export class EditIncomeComponent implements OnInit {

  incomeForm!: FormGroup; // Add "!" to tell TypeScript that it will be initialized in ngOnInit
  income: Income = { id: 0, mois: '', montantIncome: 0 }; // Initialize with default values

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private incomeService: IncomeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getIncomeDetails();
  }

  private initForm(): void {
    this.incomeForm = this.fb.group({
      mois: ['', Validators.required],
      montantIncome: [null, Validators.required]
    });
  }

  private getIncomeDetails(): void {
    const id = this.route.snapshot.params.id;
    this.incomeService.getIncome(id).subscribe(
      (data: Income) => {
        this.income = data;
        // Patch the form values with the fetched income data
        this.incomeForm.patchValue({
          mois: this.income.mois,
          montantIncome: this.income.montantIncome
        });
      },
      error => {
        console.error('Error fetching income details:', error);
      }
    );
  }

  onSubmit(): void {
    // Update the income object with the form values
    this.income.mois = this.incomeForm.value.mois;
    this.income.montantIncome = this.incomeForm.value.montantIncome;

    // Call the service method to update the income
    this.incomeService.updateIncome(this.income.id, this.income).subscribe(
      () => {
        console.log('Income updated successfully');
        // Redirect to the incomes list page
        this.router.navigate(['/incomes']);
      },
      error => {
        console.error('Error updating income:', error);
      }
    );
  }
}
