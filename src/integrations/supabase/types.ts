export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          additional_notes: string | null
          background_check_authorized: boolean | null
          created_at: string
          current_address: string
          email: string
          employer_name: string | null
          employment_duration: string | null
          employment_status: string
          full_name: string
          has_pets: boolean | null
          id: string
          id_document_url: string | null
          income_proof_url: string | null
          job_title: string | null
          monthly_income: number | null
          move_in_date: string | null
          number_of_occupants: number | null
          pet_details: string | null
          phone: string
          property_id: string
          reference_name: string | null
          reference_phone: string | null
          reference_relationship: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          additional_notes?: string | null
          background_check_authorized?: boolean | null
          created_at?: string
          current_address: string
          email: string
          employer_name?: string | null
          employment_duration?: string | null
          employment_status: string
          full_name: string
          has_pets?: boolean | null
          id?: string
          id_document_url?: string | null
          income_proof_url?: string | null
          job_title?: string | null
          monthly_income?: number | null
          move_in_date?: string | null
          number_of_occupants?: number | null
          pet_details?: string | null
          phone: string
          property_id: string
          reference_name?: string | null
          reference_phone?: string | null
          reference_relationship?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          additional_notes?: string | null
          background_check_authorized?: boolean | null
          created_at?: string
          current_address?: string
          email?: string
          employer_name?: string | null
          employment_duration?: string | null
          employment_status?: string
          full_name?: string
          has_pets?: boolean | null
          id?: string
          id_document_url?: string | null
          income_proof_url?: string | null
          job_title?: string | null
          monthly_income?: number | null
          move_in_date?: string | null
          number_of_occupants?: number | null
          pet_details?: string | null
          phone?: string
          property_id?: string
          reference_name?: string | null
          reference_phone?: string | null
          reference_relationship?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type"]
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Insert: {
          created_at?: string | null
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string | null
          user_type: Database["public"]["Enums"]["user_type"]
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Update: {
          created_at?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"]
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          amenities: string[] | null
          area_sqft: number | null
          available_from: string | null
          bathrooms: number | null
          bedrooms: number | null
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          inquiries_count: number
          is_featured: boolean
          is_verified: boolean
          landlord_id: string
          location_address: string
          location_city: string
          location_country: string
          location_lat: number | null
          location_lng: number | null
          location_state: string | null
          price_currency: string
          price_monthly: number
          property_type: string
          status: string
          title: string
          updated_at: string
          views_count: number
        }
        Insert: {
          amenities?: string[] | null
          area_sqft?: number | null
          available_from?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          inquiries_count?: number
          is_featured?: boolean
          is_verified?: boolean
          landlord_id: string
          location_address: string
          location_city: string
          location_country?: string
          location_lat?: number | null
          location_lng?: number | null
          location_state?: string | null
          price_currency?: string
          price_monthly: number
          property_type: string
          status?: string
          title: string
          updated_at?: string
          views_count?: number
        }
        Update: {
          amenities?: string[] | null
          area_sqft?: number | null
          available_from?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          inquiries_count?: number
          is_featured?: boolean
          is_verified?: boolean
          landlord_id?: string
          location_address?: string
          location_city?: string
          location_country?: string
          location_lat?: number | null
          location_lng?: number | null
          location_state?: string | null
          price_currency?: string
          price_monthly?: number
          property_type?: string
          status?: string
          title?: string
          updated_at?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "properties_landlord_id_fkey"
            columns: ["landlord_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_documents: {
        Row: {
          document_type: Database["public"]["Enums"]["document_type"]
          file_url: string
          id: string
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["verification_status"] | null
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          document_type: Database["public"]["Enums"]["document_type"]
          file_url: string
          id?: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          document_type?: Database["public"]["Enums"]["document_type"]
          file_url?: string
          id?: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verification_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      document_type:
        | "national_id"
        | "passport"
        | "driving_license"
        | "utility_bill"
        | "student_id"
        | "employment_letter"
      user_type: "landlord" | "tenant"
      verification_status: "pending" | "verified" | "rejected" | "not_started"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_type: [
        "national_id",
        "passport",
        "driving_license",
        "utility_bill",
        "student_id",
        "employment_letter",
      ],
      user_type: ["landlord", "tenant"],
      verification_status: ["pending", "verified", "rejected", "not_started"],
    },
  },
} as const
