export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Role = "admin" | "teacher" | "student" | "parent";
export type Language = "en" | "ar";
export type BillingPeriod = "month" | "term" | "year";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: Role;
          full_name: string | null;
          full_name_ar: string | null;
          avatar_url: string | null;
          phone: string | null;
          language_preference: Language;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: Role;
          full_name?: string | null;
          full_name_ar?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          language_preference?: Language;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: Role;
          full_name?: string | null;
          full_name_ar?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          language_preference?: Language;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      teachers: {
        Row: {
          id: string;
          full_name: string;
          full_name_ar: string | null;
          bio: string | null;
          bio_ar: string | null;
          subjects: string[];
          avatar_url: string | null;
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          full_name_ar?: string | null;
          bio?: string | null;
          bio_ar?: string | null;
          subjects?: string[];
          avatar_url?: string | null;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          full_name_ar?: string | null;
          bio?: string | null;
          bio_ar?: string | null;
          subjects?: string[];
          avatar_url?: string | null;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscription_plans: {
        Row: {
          id: string;
          name: string;
          name_ar: string | null;
          description: string | null;
          description_ar: string | null;
          price: number;
          currency: string;
          billing_period: BillingPeriod;
          features: string[];
          features_ar: string[];
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_ar?: string | null;
          description?: string | null;
          description_ar?: string | null;
          price: number;
          currency?: string;
          billing_period?: BillingPeriod;
          features?: string[];
          features_ar?: string[];
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_ar?: string | null;
          description?: string | null;
          description_ar?: string | null;
          price?: number;
          currency?: string;
          billing_period?: BillingPeriod;
          features?: string[];
          features_ar?: string[];
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      programs: {
        Row: {
          id: string;
          name: string;
          name_ar: string | null;
          description: string | null;
          description_ar: string | null;
          subjects: string[];
          subjects_ar: string[];
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_ar?: string | null;
          description?: string | null;
          description_ar?: string | null;
          subjects?: string[];
          subjects_ar?: string[];
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_ar?: string | null;
          description?: string | null;
          description_ar?: string | null;
          subjects?: string[];
          subjects_ar?: string[];
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_content: {
        Row: {
          id: string;
          key: string;
          value_en: string;
          value_ar: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value_en: string;
          value_ar?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value_en?: string;
          value_ar?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
