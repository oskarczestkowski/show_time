import { createClient } from "@/utils/supabase/server";
import { FiMusic } from "react-icons/fi";
import { Form } from "./form";
import { redirect } from "next/navigation";



export default async function ProtectedPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
  const {data:user} = await supabase.auth.getUser()
    if(!user){
        redirect("/")
    }
  const { data:genres, error:errGenres } = await supabase
  .rpc('get_genres')


  return (
    <main className="flex-1 my-4 flex m-auto flex-col items-center w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="flex text-2xl justify-start m-auto pl-4 gap-2 text-amber-200">
             Artist Details <FiMusic size={16} />
      </div>
      <Form genres={genres}/>
    </main>
  );
}

