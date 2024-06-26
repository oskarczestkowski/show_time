// export type AppUser = {
//   type: "artist" | "organiser"
//   user: Organiser | Artist
// }
// export type Organiser = Database["public"]["Tables"]["organizers"]["Insert"] 
// export type Artist = Database["public"]["Tables"]["artists"]["Row"] 

// export type Json =
//   | string
//   | number
//   | boolean
//   | null
//   | { [key: string]: Json | undefined }
//   | Json[]

// export type Database = {
//   public: {
//     Tables: {
//       artists: {
//         Row: {
//           artist_name: string
//           created_at: string | null
//           facebook_url: string | null
//           first_name: string
//           genre: Database["public"]["Enums"]["genres"]
//           id: string
//           image_url: string | null
//           instagram_url: string | null
//           last_name: string
//           soundcloud_url: string | null
//           tiktok_url: string | null
//           user_id: string | null
//           youtube_url: string | null
//         }
//         Insert: {
//           artist_name: string
//           created_at?: string | null
//           facebook_url?: string | null
//           first_name: string
//           genre: Database["public"]["Enums"]["genres"]
//           id: string
//           image_url?: string | null
//           instagram_url?: string | null
//           last_name: string
//           soundcloud_url?: string | null
//           tiktok_url?: string | null
//           user_id?: string | null
//           youtube_url?: string | null
//         }
//         Update: {
//           artist_name?: string
//           created_at?: string | null
//           facebook_url?: string | null
//           first_name?: string
//           genre?: Database["public"]["Enums"]["genres"]
//           id?: string
//           image_url?: string | null
//           instagram_url?: string | null
//           last_name?: string
//           soundcloud_url?: string | null
//           tiktok_url?: string | null
//           user_id?: string | null
//           youtube_url?: string | null
//         }
//         Relationships: []
//       }
//       ograniser_places: {
//         Row: {
//           address: string | null
//           coordinates: Json | null
//           created_at: string | null
//           id: string
//           organizers_id: string | null
//           place_category: Database["public"]["Enums"]["place_categories"] | null
//           place_name: string | null
//         }
//         Insert: {
//           address?: string | null
//           coordinates?: Json | null
//           created_at?: string | null
//           id: string
//           organizers_id?: string | null
//           place_category?:
//             | Database["public"]["Enums"]["place_categories"]
//             | null
//           place_name?: string | null
//         }
//         Update: {
//           address?: string | null
//           coordinates?: Json | null
//           created_at?: string | null
//           id?: string
//           organizers_id?: string | null
//           place_category?:
//             | Database["public"]["Enums"]["place_categories"]
//             | null
//           place_name?: string | null
//         }
//         Relationships: [
//           {
//             foreignKeyName: "ogranisators_place_organizers_id_organizers_id_fk"
//             columns: ["organizers_id"]
//             isOneToOne: false
//             referencedRelation: "organizers"
//             referencedColumns: ["id"]
//           },
//         ]
//       }
//       organizers: {
//         Row: {
//           created_at: string | null
//           first_name: string | null
//           id: string
//           image_url: string | null
//           last_name: string | null
//         }
//         Insert: {
//           created_at?: string | null
//           first_name?: string | null
//           id: string
//           image_url?: string | null
//           last_name?: string | null
//         }
//         Update: {
//           created_at?: string | null
//           first_name?: string | null
//           id?: string
//           image_url?: string | null
//           last_name?: string | null
//         }
//         Relationships: []
//       }
//       place_event: {
//         Row: {
//           created_at: string | null
//           date: string | null
//           description: string | null
//           event_name: string | null
//           id: string
//           place_uuid: string | null
//         }
//         Insert: {
//           created_at?: string | null
//           date?: string | null
//           description?: string | null
//           event_name?: string | null
//           id: string
//           place_uuid?: string | null
//         }
//         Update: {
//           created_at?: string | null
//           date?: string | null
//           description?: string | null
//           event_name?: string | null
//           id?: string
//           place_uuid?: string | null
//         }
//         Relationships: [
//           {
//             foreignKeyName: "place_event_place_uuid_organizers_id_fk"
//             columns: ["place_uuid"]
//             isOneToOne: false
//             referencedRelation: "organizers"
//             referencedColumns: ["id"]
//           },
//         ]
//       }
//     }
//     Views: {
//       [_ in never]: never
//     }
//     Functions: {
//       get_genres: {
//         Args: Record<PropertyKey, never>
//         Returns: Database["public"]["Enums"]["genres"][]
//       }
//     }
//     Enums: {
//       genres: "rap" | "rock" | "pop" | "country" | "elctronic" | "house"
//       place_categories: "pub" | "bar" | "club"
//     }
//     CompositeTypes: {
//       [_ in never]: never
//     }
//   }
// }

// type PublicSchema = Database[Extract<keyof Database, "public">]

// export type Tables<
//   PublicTableNameOrOptions extends
//     | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
//     | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
//         Database[PublicTableNameOrOptions["schema"]]["Views"])
//     : never = never,
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
//       Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
//       Row: infer R
//     }
//     ? R
//     : never
//   : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
//         PublicSchema["Views"])
//     ? (PublicSchema["Tables"] &
//         PublicSchema["Views"])[PublicTableNameOrOptions] extends {
//         Row: infer R
//       }
//       ? R
//       : never
//     : never

// export type TablesInsert<
//   PublicTableNameOrOptions extends
//     | keyof PublicSchema["Tables"]
//     | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
//     : never = never,
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
//       Insert: infer I
//     }
//     ? I
//     : never
//   : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
//     ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
//         Insert: infer I
//       }
//       ? I
//       : never
//     : never

// export type TablesUpdate<
//   PublicTableNameOrOptions extends
//     | keyof PublicSchema["Tables"]
//     | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
//     : never = never,
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
//       Update: infer U
//     }
//     ? U
//     : never
//   : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
//     ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
//         Update: infer U
//       }
//       ? U
//       : never
//     : never

// export type Enums<
//   PublicEnumNameOrOptions extends
//     | keyof PublicSchema["Enums"]
//     | { schema: keyof Database },
//   EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
//     : never = never,
// > = PublicEnumNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
//   : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
//     ? PublicSchema["Enums"][PublicEnumNameOrOptions]
//     : never
