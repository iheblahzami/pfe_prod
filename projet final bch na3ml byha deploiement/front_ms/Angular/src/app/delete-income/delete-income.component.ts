import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {IncomeService} from "../services/IncomeServiceImpl";

@Component({
  selector: 'app-delete-income',
  templateUrl: './delete-income.component.html',
  styleUrls: ['./delete-income.component.css']
})
export class DeleteIncomeComponent implements OnInit {

  incomeId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private incomeService: IncomeService
  ) { }

  ngOnInit(): void {
    // Extract the income ID from the route parameters
    this.incomeId = +this.route.snapshot.params.id;
  }

  onDelete(): void {
    this.incomeService.deleteIncome(this.incomeId).subscribe(
      () => {
        console.log('Income deleted successfully');
        // Redirect to the incomes list page after deletion
        this.router.navigate(['/incomes']);
      },
      error => {
        console.error('Error deleting income:', error);
        // Handle error if deletion fails
      }
    );
  }

}
