import {Income} from "./Income";

export interface Budget {


   id:number;
  nomBudget:string;
  montantBudget:number;
  income:Income;
  categories:string;
  incomeId: number;
}
