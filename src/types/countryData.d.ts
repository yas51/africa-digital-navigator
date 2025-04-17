
import { CountryData } from '@/data/countriesData';
import { Json } from '@/integrations/supabase/types';

// Étend le type CountryData de base pour inclure les propriétés Supabase supplémentaires
declare module '@/data/countriesData' {
  interface CountryData {
    wb_last_updated?: string;
    wb_gini_index?: number;
    wb_poverty_ratio?: number;
    wb_ease_business_score?: number;
    wb_trade_percentage?: number;
    wb_fdi_net_inflows?: number;
    wb_internet_users_percent?: number;
    wb_mobile_subscriptions?: number;
    // Nouveaux indicateurs économiques à ajouter
    current_inflation?: number;
    exchange_rate?: number;
    unemployment_rate?: number;
    public_debt_gdp?: number;
    trade_balance?: number;
    exchange_rate_volatility?: number;
    last_real_time_update?: string;
    // Nouveaux indicateurs politiques
    political_stability_index?: number;
    contract_enforcement_score?: number;
    property_rights_score?: number;
    geopolitical_risk_score?: number;
    fiscal_transparency_score?: number;
    special_economic_zones?: string[];
    fiscal_incentives?: string[];
    political_indicators_last_update?: string;
    // Indicateurs du climat des affaires
    ease_of_doing_business?: number;
    business_creation_days?: number;
    credit_access_score?: number;
    foreign_investor_protection?: number;
    skilled_workforce_availability?: number;
    import_export_regulations?: number;
    business_climate_last_update?: string;
    // Indicateurs logistiques et d'infrastructure
    infrastructure_quality?: number;
    road_quality?: number;
    port_quality?: number;
    airport_quality?: number;
    energy_stability?: number;
    electricity_cost?: number;
    water_cost?: number;
    fuel_cost?: number;
    lpi_score?: number;
    logistics_hubs?: string[];
    infrastructure_last_update?: string;
    // Nouveaux indicateurs socio-culturels et démographiques
    population_growth?: number;
    median_age?: number;
    urban_population_percentage?: number;
    literacy_rate?: number;
    higher_education_rate?: number;
    age_distribution?: {
      [key: string]: number;
    } | Json;
    ethnic_groups?: {
      [key: string]: number;
    } | Json;
    religious_groups?: {
      [key: string]: number;
    } | Json;
    cultural_dimensions?: {
      power_distance: number;
      individualism: number;
      masculinity: number;
      uncertainty_avoidance: number;
      long_term_orientation: number;
    } | Json;
    social_stability_index?: number;
    demographic_data_last_update?: string;
    // Nouveaux indicateurs financiers et bancaires
    financial_inclusion_rate?: number;
    banks_fintechs_count?: number;
    banking_sector_stability?: number;
    sme_financing_access?: number;
    foreign_investors_presence?: number;
    venture_capital_presence?: boolean;
    development_funds_presence?: boolean;
    foreign_investors_types?: string[];
    financial_data_last_update?: string;
  }
}
