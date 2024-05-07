import Link from "next/link";

export  function MinorLogo() {
  return (

    <Link href="/" className="px-4 flex items-center 
    justify-center text-2xl font-bold
     p-2 animate-btn-primary">
    Show Time
    </Link>

  );
}
export  function MajorLogo() {
  return (

    <Link href="/" className="
    animate-btn-primary
    px-4 flex items-center 
    justify-center text-4xl font-bold text-amber-200 border-amber-200
     p-2  border-4 tracking-wide">
    SHOWTIME
    </Link>

  );
}
