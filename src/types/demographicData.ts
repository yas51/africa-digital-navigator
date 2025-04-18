
export interface AgeDistribution {
  "0-14 ans": number;
  "15-64 ans": number;
  "65+ ans": number;
}

export interface DemographicData {
  population_growth: number;
  median_age: number;
  urban_population_percentage: number;
  literacy_rate: number;
  higher_education_rate: number;
  age_distribution: AgeDistribution;
  social_stability_index: number;
}
