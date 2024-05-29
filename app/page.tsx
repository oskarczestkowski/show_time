import JoinUsButton from "@/components/JoinUsButton";
import { MajorLogo, MinorLogo } from "@/components/Logo";
import { SignInButton } from "@/components/SignUpTile";
import PocketBase from 'pocketbase';



export default async function Index() {
  const pb = new PocketBase('http://127.0.0.1:8090');

  const users = await pb.collection('users').getFullList({
    sort: '-created',
});
const places = await pb.collection('events').getFullList({
  sort: '-created',
});
const events  = await pb.collection('places').getFullList({
  sort: '-created',
});
console.log(users,places,events)
  return (
    <main className="main mt-32">

      <MajorLogo />
      <JoinUsButton />
      <p className="text-xl text-yellow-600"> Or... </p>
      <SignInButton />

    </main>
  );
}
