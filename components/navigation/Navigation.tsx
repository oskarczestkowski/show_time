import AuthButton from "../AuthButton"
import {MinorLogo} from "../Logo"
import { createClient } from "@/utils/supabase/server";

export default async function Navigation (){
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
    return(
        <nav className="px-2 w-full bg-slate-900 items-center
         m-auto flex justify-between border-b fixed top-0 mb-12
         backdrop-blur-md opacity-100">
           <div className="z-50">
           <MinorLogo />
           </div>
        <div className=" p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      
    )
}