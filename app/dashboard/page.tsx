import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Navigation from "@/components/navigation/Navigation";
import { Map } from "./Map";
import { AsideLeft, AsideRight } from "./Asides";
import PocketBase from 'pocketbase';
import { Events } from "./Events";

export default async function ProtectedPage() {
  const pb = new PocketBase('http://127.0.0.1:8090');
//   const authData = await pb.collection('users').authRefresh();

//   const appUser = await pb.collection('users').getOne(authData.record.id
// ) as User;
const user = await pb.collection('users').getFullList({
  sort: '-created',
}) as Array<User>;
  return (
    <div className="h-screen">
      <Navigation />
      <div className="flex h-full pt-12 justify-center">
        {/* <Map /> */}
        <Events />
        <AsideLeft />
        <AsideRight appUser={user[0]} />
      </div>
    </div>
  );
}
