import JoinUsButton from "@/components/JoinUsButton";
import { MajorLogo, MinorLogo } from "@/components/Logo";
import { SignInButton } from "@/components/SignUpTile";



export default async function Index() {

  return (
    <main className="main mt-32">

      <MajorLogo />
      <JoinUsButton />
      <p className="text-xl text-yellow-600"> Or... </p>
      <SignInButton />

    </main>
  );
}
