import DeployButton from "../components/DeployButton";
import { createClient } from "@/utils/supabase/server"
import Header from "@/components/Header";
import JoinUsButton from "@/components/JoinUsButton";
import Navigation from "@/components/navigation/Navigation";
import { MajorLogo, MinorLogo } from "@/components/Logo";
import { SignInButton } from "@/components/SignUpTile";
import { db } from "@/utils/drizzle";
import { artists } from "@/schema";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const isSupabaseConnected = canInitSupabaseClient();
  const allUsers = await db.select().from(artists);
  console.log(allUsers)
  return (
    <main className="main mt-32">
      
      <MajorLogo/>
      <JoinUsButton/> 
      <p className="text-xl text-amber-200"> OR </p>
      <SignInButton />

    </main>
  );
}
