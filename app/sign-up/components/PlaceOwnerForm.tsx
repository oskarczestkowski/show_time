"use client";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

function Form() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        // Implement logic to handle form submission
        const fullName = formData.get("fullName") as string;

        // Example of logging the form data
        console.log("Form Data:", { fullName, imgUrl });
        
        // You can call your server-side function to handle this data
      }}
      className="animate-in p-4 flex-1 flex flex-col w-full justify-center 
        gap-2 text-foreground border-2 border-yellow-600"
    >
      <label className="text-md text-amber-200" htmlFor="photo">
        Upload your photo
      </label>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setImgUrl(res[0].url);
        }}
        className="border border-yellow-600 p-2"
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <label className="text-md text-amber-200" htmlFor="fullName">
        Full Name
      </label>
      <input
        className="px-2 py-1 bg-inherit border border-yellow-600 placeholder:text-gray-300"
        name="fullName"
        placeholder="your full name"
        required
      />
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
export default Form