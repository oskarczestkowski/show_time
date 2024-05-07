import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/login/submit-button";
import { FiMusic } from "react-icons/fi";


export default async function page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
    
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

const Form = ({genres}:{genres:string[]})=>{
    const insertDetails = async (formData: FormData) => {
        "use server";
        const supabase = createClient();

        const image = formData.get("image")
        const fullName = formData.get("fullName")

        
        const { data, error } = await supabase
          .storage
          .from('images')
          .upload(`${fullName}/test`, image!)
        
          if (error){
            console.log(error)
          }
      };
      
    return(
        <form
        action={insertDetails}
          className="animate-in p-4 flex-1 flex flex-col w-full justify-center 
        gap-2 text-foreground border-2 border-yellow-600"
        >
          <input type="file" name="image" required/>
          <label className="text-md text-amber-200" htmlFor="email">
            Full Name
          </label>
          <input
            className="px-2 py-1 bg-inherit border border-yellow-600  placeholder:text-gray-300"
            name="fullName"
            placeholder="your full name"
            required
          />
           <label className="text-md text-amber-200" htmlFor="password">
            Your main genre
          </label>
          <select
            className="px-2 py-1.5 bg-inherit border  border-yellow-600  placeholder:text-gray-300"
            name="genre"
            required
          >
           {genres.map((genre:string)=>(
            <option key={genre} className="text-black">{genre}</option>
           ))}
          </select>
          <button type="submit">wyślij</button>
          {/* <SubmitButton
            formAction={insertDetails}
            className="animate-btn-primary my-4 sm:text-amber-200 border-amber-200 px-2 py-1 text-foreground mb-2 font-bold text-xl"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton> */}
     
          
        </form>
    )
}
