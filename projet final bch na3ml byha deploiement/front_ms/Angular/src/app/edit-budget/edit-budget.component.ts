// edit-budget.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {ServiceBudget} from "../services/BudgetServiceImpl";


@Component({
  selector: 'app-edit-budget',
  templateUrl: './edit-budget.component.html',
  styleUrls: ['./edit-budget.component.css']
})
export class EditBudgetComponent implements OnInit {
  budgetForm: FormGroup;
  budgetId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private budgetService: ServiceBudget
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
      this.budgetId = params['id'];
      this.loadBudgetDetails();
    });
  }

  loadBudgetDetails(): void {
    this.budgetService.getBudget(this.budgetId).subscribe(
      (data: any) => {
        this.budgetForm.patchValue(data); // Populate form fields with budget details
      },
      error => {
        console.error('Error fetching budget details:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.budgetForm.invalid) {
      return;
    }

    this.budgetService.updateBudget(this.budgetId, this.budgetForm.value).subscribe(
      () => {
        console.log('Budget updated successfully');
        // Optionally, redirect or perform any other action upon successful update
      },
      error => {
        console.error('Error updating budget:', error);
      }
    );
  }
}
