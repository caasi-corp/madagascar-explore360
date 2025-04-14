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
      banners: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_path: string
          is_active: boolean
          name: string
          page: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_path: string
          is_active?: boolean
          name: string
          page: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_path?: string
          is_active?: boolean
          name?: string
          page?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          created_at: string | null
          end_date: string
          flight_id: string | null
          hotel_id: string | null
          id: string
          start_date: string
          status: string
          total_price: number
          tour_id: string | null
          user_id: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          flight_id?: string | null
          hotel_id?: string | null
          id?: string
          start_date: string
          status: string
          total_price: number
          tour_id?: string | null
          user_id: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          flight_id?: string | null
          hotel_id?: string | null
          id?: string
          start_date?: string
          status?: string
          total_price?: number
          tour_id?: string | null
          user_id?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      flights: {
        Row: {
          airline: string
          arrival: string
          arrival_time: string
          available_seats: number
          created_at: string | null
          departure: string
          departure_date: string
          departure_time: string
          id: string
          price: number
        }
        Insert: {
          airline: string
          arrival: string
          arrival_time: string
          available_seats: number
          created_at?: string | null
          departure: string
          departure_date: string
          departure_time: string
          id?: string
          price: number
        }
        Update: {
          airline?: string
          arrival?: string
          arrival_time?: string
          available_seats?: number
          created_at?: string | null
          departure?: string
          departure_date?: string
          departure_time?: string
          id?: string
          price?: number
        }
        Relationships: []
      }
      hotels: {
        Row: {
          availability: boolean | null
          created_at: string | null
          features: string[]
          id: string
          image: string
          location: string
          name: string
          price_per_night: number
          stars: number
        }
        Insert: {
          availability?: boolean | null
          created_at?: string | null
          features: string[]
          id?: string
          image: string
          location: string
          name: string
          price_per_night: number
          stars: number
        }
        Update: {
          availability?: boolean | null
          created_at?: string | null
          features?: string[]
          id?: string
          image?: string
          location?: string
          name?: string
          price_per_night?: number
          stars?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          role?: string
        }
        Relationships: []
      }
      tours: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string | null
          description: string
          duration: string
          featured: boolean | null
          id: string
          image: string
          location: string
          price: number
          rating: number
          title: string
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description: string
          duration: string
          featured?: boolean | null
          id?: string
          image: string
          location: string
          price: number
          rating: number
          title: string
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string
          duration?: string
          featured?: boolean | null
          id?: string
          image?: string
          location?: string
          price?: number
          rating?: number
          title?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          availability: boolean | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          features: string[]
          fueltype: string
          id: string
          image: string
          images: string[] | null
          name: string
          priceperday: number
          seats: number
          transmission: string
          type: string
        }
        Insert: {
          availability?: boolean | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          features: string[]
          fueltype: string
          id?: string
          image: string
          images?: string[] | null
          name: string
          priceperday: number
          seats: number
          transmission: string
          type: string
        }
        Update: {
          availability?: boolean | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          features?: string[]
          fueltype?: string
          id?: string
          image?: string
          images?: string[] | null
          name?: string
          priceperday?: number
          seats?: number
          transmission?: string
          type?: string
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
