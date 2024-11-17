import {Budget} from "./Budget";

export interface Transaction {
  id?: number;
  nomtransaction?: string;
  montantTransaction: number;
  budgetId: number;
  budget :Budget;
  editMode?: boolean; // Add the editMode property with optional "?" to indicate it may not be present in all instances

}
