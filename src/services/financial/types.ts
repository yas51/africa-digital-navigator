
// Financial data type definitions
export interface FinancialIndicators {
  financial_inclusion_rate: number;
  banks_fintechs_count: number;
  banking_sector_stability: number;
  sme_financing_access: number;
  foreign_investors_presence: number;
  venture_capital_presence: boolean;
  development_funds_presence: boolean;
  foreign_investors_types: string[];
}

export interface CountryFinancialUpdate {
  financial_inclusion_rate: number;
  banks_fintechs_count: number;
  banking_sector_stability: number;
  sme_financing_access: number;
  foreign_investors_presence: number;
  venture_capital_presence: boolean;
  development_funds_presence: boolean;
  foreign_investors_types: string[];
  financial_data_last_update: string;
}
