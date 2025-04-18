import type { CountryEconomicData } from '@/types/economicIndicators';

export const countryDataMap: CountryEconomicData = {
  "ma": {
    current_inflation: 4.9,
    exchange_rate: 10.2,
    unemployment_rate: 12.65,
    public_debt_gdp: 69.8,
    trade_balance: -5.7,
    exchange_rate_volatility: 0.8,
    ease_of_doing_business: 73.4,
    business_creation_days: 9,
    credit_access_score: 65,
    foreign_investor_protection: 70,
    skilled_workforce_availability: 55,
    import_export_regulations: 75,
    timestamp: new Date().toISOString(),
    business_climate_last_update: new Date().toISOString()
  },
    "gh": {
      current_inflation: 23.5,
      exchange_rate: 12.4,
      unemployment_rate: 4.7,
      public_debt_gdp: 88.5,
      trade_balance: -1.9,
      exchange_rate_volatility: 2.3,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 60.0,
      business_creation_days: 14,
      credit_access_score: 45,
      foreign_investor_protection: 55,
      skilled_workforce_availability: 48,
      import_export_regulations: 58,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Égypte
    "eg": {
      current_inflation: 29.8,
      exchange_rate: 48.6,
      unemployment_rate: 7.8,
      public_debt_gdp: 88.2,
      trade_balance: -3.8,
      exchange_rate_volatility: 3.2,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 60.1,
      business_creation_days: 20,
      credit_access_score: 65,
      foreign_investor_protection: 70,
      skilled_workforce_availability: 60,
      import_export_regulations: 55,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Afrique du Sud
    "za": {
      current_inflation: 5.4,
      exchange_rate: 18.5,
      unemployment_rate: 32.5,
      public_debt_gdp: 73.2,
      trade_balance: 0.5,
      exchange_rate_volatility: 1.8,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 67.0,
      business_creation_days: 40,
      credit_access_score: 60,
      foreign_investor_protection: 80,
      skilled_workforce_availability: 65,
      import_export_regulations: 68,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Kenya
    "ke": {
      current_inflation: 6.8,
      exchange_rate: 130.5,
      unemployment_rate: 5.7,
      public_debt_gdp: 70.3,
      trade_balance: -7.4,
      exchange_rate_volatility: 1.2,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 73.2,
      business_creation_days: 23,
      credit_access_score: 55,
      foreign_investor_protection: 60,
      skilled_workforce_availability: 58,
      import_export_regulations: 65,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Côte d'Ivoire
    "ci": {
      current_inflation: 3.2,
      exchange_rate: 655.9,
      unemployment_rate: 3.5,
      public_debt_gdp: 56.7,
      trade_balance: -2.3,
      exchange_rate_volatility: 0.5,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 62.4,
      business_creation_days: 7,
      credit_access_score: 50,
      foreign_investor_protection: 55,
      skilled_workforce_availability: 45,
      import_export_regulations: 60,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Nigéria
    "ng": {
      current_inflation: 33.2,
      exchange_rate: 1540.5,
      unemployment_rate: 5.0,
      public_debt_gdp: 38.4,
      trade_balance: 3.8,
      exchange_rate_volatility: 4.5,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 56.9,
      business_creation_days: 30,
      credit_access_score: 40,
      foreign_investor_protection: 45,
      skilled_workforce_availability: 50,
      import_export_regulations: 42,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Rwanda
    "rw": {
      current_inflation: 7.5,
      exchange_rate: 1252.8,
      unemployment_rate: 16.0,
      public_debt_gdp: 73.3,
      trade_balance: -12.6,
      exchange_rate_volatility: 0.9,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 76.5,
      business_creation_days: 4,
      credit_access_score: 65,
      foreign_investor_protection: 80,
      skilled_workforce_availability: 55,
      import_export_regulations: 78,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Togo
    "tg": {
      current_inflation: 3.7,
      exchange_rate: 655.9, // Franc CFA
      unemployment_rate: 3.9,
      public_debt_gdp: 58.3,
      trade_balance: -4.2,
      exchange_rate_volatility: 0.4,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 62.3,
      business_creation_days: 9,
      credit_access_score: 45,
      foreign_investor_protection: 50,
      skilled_workforce_availability: 40,
      import_export_regulations: 55,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Bénin
    "bj": {
      current_inflation: 2.9,
      exchange_rate: 655.9, // Franc CFA
      unemployment_rate: 2.3,
      public_debt_gdp: 46.1,
      trade_balance: -3.5,
      exchange_rate_volatility: 0.4,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 52.4,
      business_creation_days: 8,
      credit_access_score: 40,
      foreign_investor_protection: 45,
      skilled_workforce_availability: 35,
      import_export_regulations: 50,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Burkina Faso
    "bf": {
      current_inflation: 4.3,
      exchange_rate: 655.9, // Franc CFA
      unemployment_rate: 6.1,
      public_debt_gdp: 53.8,
      trade_balance: -1.8,
      exchange_rate_volatility: 0.5,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 51.4,
      business_creation_days: 13,
      credit_access_score: 35,
      foreign_investor_protection: 40,
      skilled_workforce_availability: 30,
      import_export_regulations: 45,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Mali
    "ml": {
      current_inflation: 4.1,
      exchange_rate: 655.9, // Franc CFA
      unemployment_rate: 7.5,
      public_debt_gdp: 49.2,
      trade_balance: -2.9,
      exchange_rate_volatility: 0.6,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 53.6,
      business_creation_days: 11,
      credit_access_score: 38,
      foreign_investor_protection: 42,
      skilled_workforce_availability: 32,
      import_export_regulations: 48,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Niger
    "ne": {
      current_inflation: 3.8,
      exchange_rate: 655.9, // Franc CFA
      unemployment_rate: 7.9,
      public_debt_gdp: 51.7,
      trade_balance: -5.4,
      exchange_rate_volatility: 0.6,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 56.8,
      business_creation_days: 10,
      credit_access_score: 40,
      foreign_investor_protection: 45,
      skilled_workforce_availability: 30,
      import_export_regulations: 52,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Cameroun
    "cm": {
      current_inflation: 6.3,
      exchange_rate: 655.9, // Franc CFA
      unemployment_rate: 3.6,
      public_debt_gdp: 45.2,
      trade_balance: -2.8,
      exchange_rate_volatility: 0.6,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 46.1,
      business_creation_days: 13,
      credit_access_score: 35,
      foreign_investor_protection: 45,
      skilled_workforce_availability: 42,
      import_export_regulations: 50,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Tanzanie
    "tz": {
      current_inflation: 3.5,
      exchange_rate: 2510.0, 
      unemployment_rate: 2.2,
      public_debt_gdp: 40.5,
      trade_balance: -3.1,
      exchange_rate_volatility: 1.2,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 54.5,
      business_creation_days: 10,
      credit_access_score: 45,
      foreign_investor_protection: 50,
      skilled_workforce_availability: 40,
      import_export_regulations: 55,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Ouganda
    "ug": {
      current_inflation: 5.8,
      exchange_rate: 3740.0,
      unemployment_rate: 2.8,
      public_debt_gdp: 52.6,
      trade_balance: -6.3,
      exchange_rate_volatility: 1.5,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 60.0,
      business_creation_days: 24,
      credit_access_score: 42,
      foreign_investor_protection: 55,
      skilled_workforce_availability: 45,
      import_export_regulations: 52,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Éthiopie
    "et": {
      current_inflation: 32.5,
      exchange_rate: 56.5,
      unemployment_rate: 3.7,
      public_debt_gdp: 35.8,
      trade_balance: -4.5,
      exchange_rate_volatility: 2.8,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 48.0,
      business_creation_days: 32,
      credit_access_score: 35,
      foreign_investor_protection: 40,
      skilled_workforce_availability: 45,
      import_export_regulations: 40,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Sénégal
    "sn": {
      current_inflation: 3.6,
      exchange_rate: 655.9, // Franc CFA
      unemployment_rate: 7.1,
      public_debt_gdp: 64.2,
      trade_balance: -9.8,
      exchange_rate_volatility: 0.5,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 59.3,
      business_creation_days: 6,
      credit_access_score: 50,
      foreign_investor_protection: 60,
      skilled_workforce_availability: 50,
      import_export_regulations: 60,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Mozambique
    "mz": {
      current_inflation: 8.3,
      exchange_rate: 63.8,
      unemployment_rate: 3.4,
      public_debt_gdp: 103.5,
      trade_balance: -25.8,
      exchange_rate_volatility: 1.9,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 55.0,
      business_creation_days: 17,
      credit_access_score: 40,
      foreign_investor_protection: 45,
      skilled_workforce_availability: 38,
      import_export_regulations: 50,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Zambie
    "zm": {
      current_inflation: 9.8,
      exchange_rate: 23.7,
      unemployment_rate: 13.2,
      public_debt_gdp: 98.7,
      trade_balance: 1.7,
      exchange_rate_volatility: 2.1,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 66.9,
      business_creation_days: 7,
      credit_access_score: 45,
      foreign_investor_protection: 65,
      skilled_workforce_availability: 55,
      import_export_regulations: 60,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // RD Congo
    "cd": {
      current_inflation: 13.2,
      exchange_rate: 2485.0,
      unemployment_rate: 4.5,
      public_debt_gdp: 21.5,
      trade_balance: 2.3,
      exchange_rate_volatility: 3.2,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 36.2,
      business_creation_days: 16,
      credit_access_score: 25,
      foreign_investor_protection: 30,
      skilled_workforce_availability: 35,
      import_export_regulations: 30,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    },
    // Angola
    "ao": {
      current_inflation: 20.5,
      exchange_rate: 832.0,
      unemployment_rate: 34.5,
      public_debt_gdp: 84.3,
      trade_balance: 10.5,
      exchange_rate_volatility: 2.7,
      // Indicateurs du climat des affaires
      ease_of_doing_business: 41.3,
      business_creation_days: 36,
      credit_access_score: 30,
      foreign_investor_protection: 40,
      skilled_workforce_availability: 50,
      import_export_regulations: 35,
      timestamp: new Date().toISOString(),
      business_climate_last_update: new Date().toISOString()
    }
};

export const getDefaultEconomicData = () => ({
  current_inflation: parseFloat((2 + Math.random() * 3).toFixed(2)),
  exchange_rate: parseFloat((1 + Math.random() * 0.2).toFixed(4)),
  unemployment_rate: parseFloat((4 + Math.random() * 6).toFixed(1)),
  public_debt_gdp: parseFloat((50 + Math.random() * 40).toFixed(1)),
  trade_balance: parseFloat((-10 + Math.random() * 20).toFixed(2)),
  exchange_rate_volatility: parseFloat((0.1 + Math.random() * 0.9).toFixed(2)),
  ease_of_doing_business: parseFloat((50 + Math.random() * 30).toFixed(1)),
  business_creation_days: Math.floor(5 + Math.random() * 25),
  credit_access_score: Math.floor(30 + Math.random() * 50),
  foreign_investor_protection: Math.floor(40 + Math.random() * 40),
  skilled_workforce_availability: Math.floor(40 + Math.random() * 30),
  import_export_regulations: Math.floor(40 + Math.random() * 30),
  timestamp: new Date().toISOString(),
  business_climate_last_update: new Date().toISOString()
});
