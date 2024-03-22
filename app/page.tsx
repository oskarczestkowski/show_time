import DeployButton from "../components/DeployButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import JoinUsButton from "@/components/JoinUsButton";
import Navigation from "@/components/navigation/Navigation";
import { MajorrLogo, MinorLogo } from "@/components/Logo";

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

  return (
    <main className="main">
      
      <MajorrLogo/>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
      
          {isSupabaseConnected ? <JoinUsButton/> : <ConnectSupabaseSteps />}
       
      </div>

    </main>
  );
}
