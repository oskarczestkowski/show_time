"use client";
import { createAnArtist } from "@/app/next_actions/artist";
import { createClient } from "@/utils/supabase/client";
import { UploadButton } from "@/utils/uploadthing";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Form = () => {
  const [imgUrl, setImgUrl] = useState<string>("");
  const router = useRouter()
  const genres = ["rap, rock, hip-hop"]
  return (
    <form
      action={async (formData) => {
        if (imgUrl === "") {
          alert("You must upload a photo!")
          return;
        }

        const { error, success } = await createAnArtist(formData, imgUrl);
        if (success) {
          router.push("/dashboard")
        }
        if (error) {
          alert(error)
        }
      }}
      className="animate-in p-4 flex-1 flex flex-col w-full justify-center 
        gap-2 text-foreground border-2 border-yellow-600"
    >

      <label className="text-md text-amber-200" htmlFor="email">
        Upload your photo
      </label>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setImgUrl(res[0].url);
        }}
        className="border border-yellow-600 p-2"
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <label className="text-md text-amber-200" htmlFor="email">
        Full Name
      </label>
      <input
        className="px-2 py-1 bg-inherit border border-yellow-600  placeholder:text-gray-300"
        name="fullName"
        placeholder="your full name"
        required
      />
      <label className="text-md text-amber-200" htmlFor="email">
        Artist Name
      </label>
      <input
        className="px-2 py-1 bg-inherit border border-yellow-600  placeholder:text-gray-300"
        name="name"
        placeholder="Artist name"
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
        {genres.map((genre: string) => (
          <option key={genre} className="text-black">
            {genre}
          </option>
        ))}
      </select>
      <button
        type="submit"

        className="animate-btn-primary my-4 sm:text-amber-200 border-amber-200
             px-2 py-1 text-foreground mb-2 font-bold text-xl"
      >
        Submit
      </button>
    </form>
  );
};
