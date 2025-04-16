export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      countries: {
        Row: {
          age_distribution: Json | null
          airport_quality: number | null
          contract_enforcement_score: number | null
          corruptionIndex: number
          cultural_dimensions: Json | null
          current_inflation: number | null
          demographic_data_last_update: string | null
          doingBusinessRank: number
          education: number
          electricity_cost: number | null
          energy_stability: number | null
          ethnic_groups: Json | null
          exchange_rate: number | null
          exchange_rate_volatility: number | null
          fdiInflow: number
          fiscal_incentives: string[] | null
          fiscal_transparency_score: number | null
          flag: string
          fuel_cost: number | null
          gdp: number
          gdpGrowth: number
          geopolitical_risk_score: number | null
          hdi: number
          higher_education_rate: number | null
          id: string
          infrastructure_last_update: string | null
          infrastructure_quality: number | null
          internetPenetration: number
          last_real_time_update: string | null
          legal_framework_updated_at: string | null
          literacy_rate: number | null
          logistics_hubs: string[] | null
          logisticsIndex: number
          lpi_score: number | null
          median_age: number | null
          mobilePenetration: number
          name: string
          officialLanguages: string[]
          opportunityScore: number
          political_indicators_last_update: string | null
          political_stability_index: number | null
          politicalStability: number
          population: number
          population_growth: number | null
          port_quality: number | null
          property_rights_score: number | null
          public_debt_gdp: number | null
          region: string
          religious_groups: Json | null
          road_quality: number | null
          social_stability_index: number | null
          special_economic_zones: string[] | null
          trade_balance: number | null
          unemployment_rate: number | null
          urban_population_percentage: number | null
          water_cost: number | null
          wb_ease_business_score: number | null
          wb_fdi_net_inflows: number | null
          wb_gini_index: number | null
          wb_high_tech_exports: number | null
          wb_internet_users_percent: number | null
          wb_last_updated: string | null
          wb_mobile_subscriptions: number | null
          wb_poverty_ratio: number | null
          wb_research_expenditure: number | null
          wb_trade_percentage: number | null
        }
        Insert: {
          age_distribution?: Json | null
          airport_quality?: number | null
          contract_enforcement_score?: number | null
          corruptionIndex: number
          cultural_dimensions?: Json | null
          current_inflation?: number | null
          demographic_data_last_update?: string | null
          doingBusinessRank: number
          education: number
          electricity_cost?: number | null
          energy_stability?: number | null
          ethnic_groups?: Json | null
          exchange_rate?: number | null
          exchange_rate_volatility?: number | null
          fdiInflow: number
          fiscal_incentives?: string[] | null
          fiscal_transparency_score?: number | null
          flag: string
          fuel_cost?: number | null
          gdp: number
          gdpGrowth: number
          geopolitical_risk_score?: number | null
          hdi: number
          higher_education_rate?: number | null
          id: string
          infrastructure_last_update?: string | null
          infrastructure_quality?: number | null
          internetPenetration: number
          last_real_time_update?: string | null
          legal_framework_updated_at?: string | null
          literacy_rate?: number | null
          logistics_hubs?: string[] | null
          logisticsIndex: number
          lpi_score?: number | null
          median_age?: number | null
          mobilePenetration: number
          name: string
          officialLanguages: string[]
          opportunityScore: number
          political_indicators_last_update?: string | null
          political_stability_index?: number | null
          politicalStability: number
          population: number
          population_growth?: number | null
          port_quality?: number | null
          property_rights_score?: number | null
          public_debt_gdp?: number | null
          region: string
          religious_groups?: Json | null
          road_quality?: number | null
          social_stability_index?: number | null
          special_economic_zones?: string[] | null
          trade_balance?: number | null
          unemployment_rate?: number | null
          urban_population_percentage?: number | null
          water_cost?: number | null
          wb_ease_business_score?: number | null
          wb_fdi_net_inflows?: number | null
          wb_gini_index?: number | null
          wb_high_tech_exports?: number | null
          wb_internet_users_percent?: number | null
          wb_last_updated?: string | null
          wb_mobile_subscriptions?: number | null
          wb_poverty_ratio?: number | null
          wb_research_expenditure?: number | null
          wb_trade_percentage?: number | null
        }
        Update: {
          age_distribution?: Json | null
          airport_quality?: number | null
          contract_enforcement_score?: number | null
          corruptionIndex?: number
          cultural_dimensions?: Json | null
          current_inflation?: number | null
          demographic_data_last_update?: string | null
          doingBusinessRank?: number
          education?: number
          electricity_cost?: number | null
          energy_stability?: number | null
          ethnic_groups?: Json | null
          exchange_rate?: number | null
          exchange_rate_volatility?: number | null
          fdiInflow?: number
          fiscal_incentives?: string[] | null
          fiscal_transparency_score?: number | null
          flag?: string
          fuel_cost?: number | null
          gdp?: number
          gdpGrowth?: number
          geopolitical_risk_score?: number | null
          hdi?: number
          higher_education_rate?: number | null
          id?: string
          infrastructure_last_update?: string | null
          infrastructure_quality?: number | null
          internetPenetration?: number
          last_real_time_update?: string | null
          legal_framework_updated_at?: string | null
          literacy_rate?: number | null
          logistics_hubs?: string[] | null
          logisticsIndex?: number
          lpi_score?: number | null
          median_age?: number | null
          mobilePenetration?: number
          name?: string
          officialLanguages?: string[]
          opportunityScore?: number
          political_indicators_last_update?: string | null
          political_stability_index?: number | null
          politicalStability?: number
          population?: number
          population_growth?: number | null
          port_quality?: number | null
          property_rights_score?: number | null
          public_debt_gdp?: number | null
          region?: string
          religious_groups?: Json | null
          road_quality?: number | null
          social_stability_index?: number | null
          special_economic_zones?: string[] | null
          trade_balance?: number | null
          unemployment_rate?: number | null
          urban_population_percentage?: number | null
          water_cost?: number | null
          wb_ease_business_score?: number | null
          wb_fdi_net_inflows?: number | null
          wb_gini_index?: number | null
          wb_high_tech_exports?: number | null
          wb_internet_users_percent?: number | null
          wb_last_updated?: string | null
          wb_mobile_subscriptions?: number | null
          wb_poverty_ratio?: number | null
          wb_research_expenditure?: number | null
          wb_trade_percentage?: number | null
        }
        Relationships: []
      }
      discussion_messages: {
        Row: {
          content: string
          created_at: string | null
          discussion_id: string | null
          id: string
          is_system: boolean | null
          sender_initials: string
          sender_name: string
        }
        Insert: {
          content: string
          created_at?: string | null
          discussion_id?: string | null
          id?: string
          is_system?: boolean | null
          sender_initials: string
          sender_name: string
        }
        Update: {
          content?: string
          created_at?: string | null
          discussion_id?: string | null
          id?: string
          is_system?: boolean | null
          sender_initials?: string
          sender_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_messages_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      discussions: {
        Row: {
          author: string
          content: string
          created_at: string | null
          date: string | null
          id: string
          messages: number | null
          participants: number | null
          tags: string[] | null
          title: string
          url: string | null
        }
        Insert: {
          author: string
          content: string
          created_at?: string | null
          date?: string | null
          id?: string
          messages?: number | null
          participants?: number | null
          tags?: string[] | null
          title: string
          url?: string | null
        }
        Update: {
          author?: string
          content?: string
          created_at?: string | null
          date?: string | null
          id?: string
          messages?: number | null
          participants?: number | null
          tags?: string[] | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
