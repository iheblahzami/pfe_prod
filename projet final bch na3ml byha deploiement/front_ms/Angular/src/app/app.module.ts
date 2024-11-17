import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import {HttpClient, HttpClientModule, HttpClientXsrfModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { EditIncomeComponent } from './edit-income/edit-income.component';
import { DeleteIncomeComponent } from './delete-income/delete-income.component';
import { ShowIncomeComponent } from './show-income/show-income.component';
import { EditBudgetComponent } from './edit-budget/edit-budget.component';
import { ShowIncomeByIdComponent } from './show-income-by-id/show-income-by-id.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { ShowBudgetsComponent } from './show-budgets/show-budgets.component';
import { ShowBudgetByIdComponent } from './show-budget-by-id/show-budget-by-id.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { ShowTransactionComponent } from './show-transaction/show-transaction.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {JwtInterceptor} from "./JwtInterceptor";
import {AuthGuard} from "./services/AuthGuard";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AuthGuardLoggedIn} from "./services/AuthGuardLoggedIn";
import {AuthService} from "./services/AuthService";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    AddIncomeComponent,
    EditIncomeComponent,
    DeleteIncomeComponent,
    ShowIncomeComponent,
    EditBudgetComponent,
    ShowIncomeByIdComponent,
    AddBudgetComponent,
    ShowBudgetsComponent,
    ShowBudgetByIdComponent,
    AddTransactionComponent,
    ShowTransactionComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,



  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
      HttpClientModule,
        AppRoutingModule,
      FormsModule,
      NgxPaginationModule,
      RouterModule.forRoot([]),

    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthService,
    AuthGuard,
    AuthGuardLoggedIn
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
