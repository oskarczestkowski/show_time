import {Roboto_Condensed} from "next/font/google"
import Link from "next/link";
export const robotoCondensed = Roboto_Condensed({
    weight:"700",
    subsets:["latin"],
});

export default function JoinUsButton() {
    return (
      <Link href="/sign-up" className={`${robotoCondensed.className} text-4xl sm:text-6xl flex justify-end text-center p-2 px-10 animate-btn-primary`}>
      GET STARTED
    </Link>
    );
  }
  