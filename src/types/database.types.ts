export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Role = "admin" | "teacher" | "student" | "parent";
export type Language = "en" | "ar";

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
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
