import { createClient } from "@/utils/supabase/server";
import { FiMusic } from "react-icons/fi";
import { Form } from "../../form";
import { redirect, useRouter } from "next/navigation";



export default async function Page({
  searchParams,
}: {
  searchParams: { userId: string };
}) {  
  console.log(searchParams.userId)
  return (
    <main className="flex-1 my-4 flex m-auto flex-col items-center w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="flex text-2xl justify-start m-auto pl-4 gap-2 text-amber-200">
        Artist Details <FiMusic size={16} />
      </div>
      <Form />
    </main>
  );
}

