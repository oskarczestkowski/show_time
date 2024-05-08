import { createClient } from "@/utils/supabase/server";
import { FiMusic } from "react-icons/fi";
import { Form } from "./form";



export default async function page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
  const isSession = await supabase.auth.getSession()
    console.log(isSession)
  const { data:genres, error:errGenres } = await supabase
  .rpc('get_genres')


  return (
    <main className="flex-1 my-4 flex m-auto flex-col items-center w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="flex text-2xl justify-start m-auto pl-4 gap-2 text-amber-200">
             Artist Details <FiMusic size={16} />
      </div>
      {isSession ? <Form genres={genres}/> : false}
  
    </main>
  );
}

