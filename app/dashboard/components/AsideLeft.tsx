"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import ToggleButton from "./ToggleButton";
import Inbox from "./Inbox";
import { useUser } from '@/app/contexts/UserContext';

const CalendarElement = dynamic(() => import('./CalendarElement'), { ssr: false });

const AsideLeft = () => {
  const [isRender, setIsRender] = useState(true);
  const mainControls = useAnimation();
  const initialX = -384;
  const { user } = useUser();

  useEffect(() => {
    if (isRender) {
      mainControls.start("visible");
    } else {
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
        transition={{ duration: 0.5, delay: 0 }}
        className="flex fixed h-screen top-12 pt-2 left-0 z-40 max-w-xl"
      >
        <div className="relative h-full">
          <div className="h-full bg-slate-900 w-full max-w-96 border-r border-t border-amber-200 mt-[6px]">
            {isRender ? <CalendarElement /> : null}
            {user ? <Inbox userId={user.id} userRole={user.role} /> : <p>Loading user...</p>}
          </div>
        </div>

      </motion.aside>
      <ToggleButton isRender={isRender} onClick={() => setIsRender(!isRender)} side="left" />

    </>
  );
};

export default AsideLeft;
