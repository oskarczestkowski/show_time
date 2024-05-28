"use client";

import { AppUser, Artist } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaSoundcloud,
  FaUser,
} from "react-icons/fa";
import { MdEvent, MdEventAvailable } from "react-icons/md";
import SocialMediaForm from "./EditForm";
import Calendar from 'react-calendar';
import dynamic from 'next/dynamic'
 
const CalendarElement = dynamic(() => import('./CalendarElement'), { ssr: false })

export const AsideRight = ({ appUser }: { appUser: AppUser }) => {
  const [isRender, setIsRender] = useState(true);
  const mainControls = useAnimation();

  useEffect(() => {
    if (isRender) {
      mainControls.start("visible");
    }
    if (!isRender) {
      mainControls.start("hidden");
    }
  }, [isRender]);


  return (
    <>
      <motion.aside
        variants={{
          hidden: { x: 260, opacity: 1 },
          visible: { x: 0, opacity: 1 },
        }}
        initial="visible"
        animate={mainControls}
        transition={{
          duration: 0.5,
          delay: 0,
        }}
        className={`flex fixed  h-screen top-12 pt-2 right-0 z-40 
       `}
      >
        <div className="relative h-full">
          <div
            className={`h-full flex flex-col gap-4 items-center bg-slate-900 border-l border-amber-200 w-64 py-4 px-2${isRender ? "" : ""
              }`}
          >
            <p className="font-bold">
              {appUser.type.toUpperCase()}
            </p>
            <Image src={appUser.user.image_url as string}
              alt="Your photo" width={400} height={400}
              className="h-32 w-32 rounded-sm border-4 border-yellow-600" />
            {/* {appUser.type == "artist" ? <p> {appUser.user.artist_name}</p>
              : null} */}
            <SocialMediaForm appUser={appUser} />

          </div>
        </div>

      </motion.aside>
      <motion.button
        variants={{
          hidden: { x: 260, opacity: 1 },
          visible: { x: 0, opacity: 1 },
        }}
        initial="visible"
        animate={mainControls}
        transition={{
          duration: 0.5,
          delay: 0,
        }}
        onClick={() => setIsRender(!isRender)}
        className="fixed flex flex-col gap-4 items-center border-amber-200
        border-y border-l
    bottom-1/2 right-[16rem] z-50 text-amber-200 bg-gray-700 rounded-l-md p-1 py-1.5 animate-btn-aside"
      >
        {true ? <FaUser size={24} /> : null}
        <div className="">
          {!isRender ? <FaArrowLeft size={24} /> : <FaArrowRight size={24} />}
        </div>
      </motion.button>
    </>
  );
};
export const AsideLeft = () => {
  const [isRender, setIsRender] = useState(true);
  const mainControls = useAnimation();
  const [value, onChange] = useState<Date>(new Date());
  const initialX = -384
  useEffect(() => {
    if (isRender) {
      mainControls.start("visible");
    }
    if (!isRender) {
      mainControls.start("hidden");
    }
  }, [isRender]);

  return (
    <>
      <motion.aside
        variants={{
          hidden: { x: initialX, opacity: 1 },
          visible: { x: 0, opacity: 1 },
        }}
        initial="visible"
        animate={mainControls}
        transition={{
          duration: 0.5,
          delay: 0,
        }}
        className={`flex fixed h-screen top-12 pt-2 left-0 z-40 
         `}
      >
        <div className="relative h-full">
          <div
            className={`h-full bg-slate-900 w-full max-w-96 
            border-r border-t border-amber-200 mt-[6px]${isRender ? "" : ""
              }`}
          >
           {value ?  <CalendarElement/> : null}
              <div className="p-4"></div>
          </div>
        </div>
      </motion.aside>
      <motion.button
        variants={{
          hidden: { x: initialX, opacity: 1 },
          visible: { x: 0, opacity: 1 },
        }}
        initial="visible"
        animate={mainControls}
        transition={{
          duration: 0.5,
          delay: 0,
        }}
        onClick={() => setIsRender(!isRender)}
        className="fixed flex flex-col gap-4 items-center animate-btn border-amber-200
          border-y border-r animate-btn-aside
      bottom-1/2 left-[24rem] z-50 text-amber-200 bg-gray-700 rounded-r-md p-1 py-1.5"
      >
        {true ? <MdEventAvailable size={26} /> : null}
        <div className="">
          {isRender ? <FaArrowLeft size={24} /> : <FaArrowRight size={24} />}
        </div>
      </motion.button>
    </>
  );
};

