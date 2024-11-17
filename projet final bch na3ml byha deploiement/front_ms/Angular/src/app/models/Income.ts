import {Budget} from "./Budget";

export interface Income {
  id: number;
  mois: string;
  montantIncome: number;
  budgets?: Budget[];
  editMode?: boolean; // Add the editMode property with optional "?" to indicate it may not be present in all instances
}
