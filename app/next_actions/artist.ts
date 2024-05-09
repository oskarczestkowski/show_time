"use server";

import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";

export const createAnArtist = async (form: FormData, imgUrl: string) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUserIdentities();

  const userId = data?.identities[0].id;

  const fullName = form.get("fullName") as string;
  const parts = fullName?.trim().split(" ");
  if (parts.length < 2) {
    return { error: "You must enter full name with name and last name!"};
  }
  const first_name = parts.slice(0, parts.length - 1).join(" ");
  const last_name = parts[parts.length - 1];
  const genre = form.get("genre");
  const name = form.get("name");

  const { data: insert, error } = await supabase.from("artists").insert({
    id: randomUUID(),
    artist_name: name,
    first_name,
    last_name,
    image_url: imgUrl,
    genre,
    user_id: userId,
  });
  if (error) {
    return { error: true };
  }
  return { success: true };
};
