"use server";

import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";

export const createAPlaceOwner = async (form: FormData, imgUrl: string) => {
  console.log("hello from action", form);
  const supabase = createClient();

  const fullName = form.get("fullName") as string;
  const parts = fullName?.trim().split(" ");
  if (parts.length < 2) {
    return { error: true };
  }
  const first_name = parts.slice(0, parts.length - 1).join(" ");
  const last_name = parts[parts.length - 1];

  const name = form.get("name");
  const { error } = await supabase.from("organizers").insert({
    id: randomUUID(),
    first_name,
    last_name,
    image_url: imgUrl,
  });

  if (error) {
    console.log(error);
    return { error: true };
  }
  return { success: true };
};
