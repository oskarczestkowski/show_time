import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Navigation from "@/components/navigation/Navigation";
import Map from "./map";
import {  AsideLeft, AsideRight } from "./aside";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // return redirect("/login");
  }

  return (
    <div className="h-screen">
      <Navigation />
      <div className="flex h-full pt-12">
        <Map />
        <AsideLeft/>
        <AsideRight />
      </div>
    </div>
  );
}
