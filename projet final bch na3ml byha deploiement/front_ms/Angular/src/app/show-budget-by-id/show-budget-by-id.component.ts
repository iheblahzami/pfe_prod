import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Budget} from "../models/Budget";
import {ServiceBudget} from "../services/BudgetServiceImpl";


@Component({
  selector: 'app-show-budget-by-id',
  templateUrl: './show-budget-by-id.component.html',
  styleUrls: ['./show-budget-by-id.component.css']
})
export class ShowBudgetByIdComponent implements OnInit {
  budget!: Budget ;

  constructor(
    private route: ActivatedRoute,
    private budgetService: ServiceBudget
  ) { }

  ngOnInit(): void {
    this.getBudgetById();
  }

  getBudgetById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const budgetId = parseInt(id, 10); // Parse string to number
      this.budgetService.getBudget(budgetId).subscribe(
        (data: Budget) => {
          this.budget = data;
          console.log('Income ID:', this.budget.incomeId);
        },
        error => {
          console.error('Error fetching budget details:', error);
        }
      );
    }
  }
}
