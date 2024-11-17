import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIncomeComponent } from './add-income/add-income.component';
import {EditIncomeComponent} from "./edit-income/edit-income.component";
import {DeleteIncomeComponent} from "./delete-income/delete-income.component";
import {ShowIncomeComponent} from "./show-income/show-income.component";
import {ShowIncomeByIdComponent} from "./show-income-by-id/show-income-by-id.component";
import {AddBudgetComponent} from "./add-budget/add-budget.component";
import {EditBudgetComponent} from "./edit-budget/edit-budget.component";
import {ShowBudgetsComponent} from "./show-budgets/show-budgets.component";
import {ShowBudgetByIdComponent} from "./show-budget-by-id/show-budget-by-id.component";
import {AddTransactionComponent} from "./add-transaction/add-transaction.component";
import {ShowTransactionComponent} from "./show-transaction/show-transaction.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./services/AuthGuard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuardLoggedIn} from "./services/AuthGuardLoggedIn";



const routes: Routes = [
  // { path: 'incomes', component: IncomeListComponent }
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
     { path: 'register', component: RegisterComponent },
  { path: 'addincome', component: AddIncomeComponent },
  { path: 'editincome/:id', component: EditIncomeComponent },
  { path: 'deleteincome/:id', component: DeleteIncomeComponent },
  { path: 'showincomes', component: ShowIncomeComponent , canActivate: [AuthGuardLoggedIn]},
  { path: 'income/:id', component: ShowIncomeByIdComponent },
  { path: 'addbudget', component: AddBudgetComponent },
  { path: 'editbudget/:id', component: EditBudgetComponent },
  { path: 'showbudgets', component: ShowBudgetsComponent },
  { path: 'budget/:id', component: ShowBudgetByIdComponent },
  { path: 'addtransaction', component: AddTransactionComponent },
  { path: 'add/:budgetId', component: AddTransactionComponent },
  { path: 'edittransaction/:id', component: ShowTransactionComponent },
  { path: 'showTransactions', component: ShowTransactionComponent },
  { path: 'add-budget', component: AddBudgetComponent },

  { path: 'dash', component: DashboardComponent },
  // Add more routes as needed and protect them with AuthGuardLoggedIn if necessary
  { path: '**', redirectTo: '' } // Wildcard route in case of invalid URL














  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
