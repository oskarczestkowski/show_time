import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed_main = Roboto_Condensed({
  weight: '800',
  subsets: ['latin'],

})

export function MinorLogo() {
  return (

    <Link href="/" className={`px-4 flex items-center justify-center text-2xl font-bold 
    text-amber-200 border-amber-200 p-2 animate-btn-primary 
    ${roboto_condensed_main.className}`}>
      SHOWTIME
    </Link>

  );
}
export function MajorLogo() {
  return (

    <Link href="/" className={`
    animate-btn-primary
    px-4 flex items-center 
    justify-center text-4xl font-bold text-amber-200 border-amber-200
     p-2  border-4 tracking-wide ${roboto_condensed_main.className}`}>
      SHOWTIME
    </Link>

  );
}
