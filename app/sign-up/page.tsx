import Link from "next/link";
import { FiMusic } from "react-icons/fi";
import { MdOutlinePlace } from "react-icons/md";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <main className="main my-4 sm:my-24 animate-in">
      <p className="text-2xl text-amber-200">You are an...</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-be items-center gap-8 text-center">
        <Link
          href="/sign-up/artist?role=artist"
          className="animate-btn-primary p-8
        flex flex-col gap-4
        text-base sm:text-xl 
        justify-center items-center
        w-44 h-44
        sm:w-64 sm:h-64"
        >
          <FiMusic size={72} />
          Artist
        </Link>
        <p className="sm:hidden block">Or</p>
        <Link
          href="/sign-up/place-owner?role=organizer"
          className="animate-btn-primary p-8 
          text-base sm:text-xl 
        flex flex-col gap-4
        justify-center items-center
        w-44 h-44
        sm:w-64 sm:h-64"
        >
          <MdOutlinePlace size={72} />
          Place owner
        </Link>
      </div>
    </main>
  );
}
