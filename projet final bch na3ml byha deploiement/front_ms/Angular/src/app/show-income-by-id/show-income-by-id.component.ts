import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Income } from '../models/Income';
import {IncomeService} from "../services/IncomeServiceImpl";

@Component({
  selector: 'app-show-income-by-id',
  templateUrl: './show-income-by-id.component.html',
  styleUrls: ['./show-income-by-id.component.css']
})
export class ShowIncomeByIdComponent implements OnInit {
  income!: Income ;


  constructor(
    private route: ActivatedRoute,
    private incomeService: IncomeService,
  ) { }

  ngOnInit(): void {
    this.getIncomeById();
  }

  getIncomeById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const incomeId = parseInt(id, 10); // Parse string to number
      this.incomeService.getIncome(incomeId).subscribe(
        (data: Income) => {
          this.income = data;
          console.log('Income ID:', this.income.id);
        },
        error => {
          console.error('Error fetching income details:', error);
        }
      );
    }
  }
}
