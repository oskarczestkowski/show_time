"use server";

import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import PocketBase from "pocketbase";

export const createAnArtist = async (
  form: FormData,
  imgUrl: string,
  userId: number
) => {
  const pb = new PocketBase("http://127.0.0.1:8090");
  return { success: true };
};
