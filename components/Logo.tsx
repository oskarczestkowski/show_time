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
export  function MajorrLogo() {
  return (

    <Link href="/" className="px-4 flex items-center 
    justify-center text-4xl font-bold
     p-2 animate-btn-primary border-4 tracking-wide">
    SHOWTIME
    </Link>

  );
}
