
export interface EconomicIndicators {
  current_inflation: number;
  exchange_rate: number;
  unemployment_rate: number;
  public_debt_gdp: number;
  trade_balance: number;
  exchange_rate_volatility: number;
  ease_of_doing_business: number;
  business_creation_days: number;
  credit_access_score: number;
  foreign_investor_protection: number;
  skilled_workforce_availability: number;
  import_export_regulations: number;
  timestamp: string;
  business_climate_last_update: string;
}

export interface CountryEconomicData {
  [key: string]: EconomicIndicators;
}
