import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Navigation from "@/components/navigation/Navigation";
import Map from "./Map";
import { AsideLeft, AsideRight } from "./Asides";
import { AppUser, Artist, Organiser } from "@/types/database.types";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    // return redirect("/login");
  }

  const { data: artist, error: errorArtists } = await supabase
    .from('artists')
    .select().eq("user_id", user!.id)
  const { data: organiser, error: errorOrganiser } = await supabase
    .from('organisers')
    .select().eq("user_id", user!.id)
  if (errorArtists && errorOrganiser ){
    return
  }

  const appUser:AppUser = {
    type: errorArtists ? "organiser" : "artist",
    user:  errorArtists ? organiser![0] as Artist: artist![0] as Organiser ,
  }

  return (
    <div className="h-screen">
      <Navigation />
      <div className="flex h-full pt-12">
        <Map />
        <AsideLeft />
        <AsideRight appUser={appUser} />
      </div>
    </div>
  );
}
