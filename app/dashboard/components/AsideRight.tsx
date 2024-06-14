// components/AsideRight.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import UserAvatar from "./userAvatar";
import ToggleButton from "./ToggleButton";
import { User } from "@/.next/types/types";

const AsideRight = ({ appUser }: { appUser: User }) => {
  const [isRender, setIsRender] = useState(true);
  const mainControls = useAnimation();

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
          hidden: { x: 260, opacity: 1 },
          visible: { x: 0, opacity: 1 },
        }}
        initial="visible"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0 }}
        className="flex fixed h-screen top-12 pt-2 right-0 z-40 max-w-xl"
      >
        <div className="relative h-full">
          <div className="h-full flex flex-col gap-4 items-center bg-slate-900 border-l border-amber-200 w-64 py-4 px-2">
            <UserAvatar user={appUser} />
          </div>
        </div>
      </motion.aside>
      <ToggleButton isRender={isRender} onClick={() => setIsRender(!isRender)} side="right" />
    </>
  );
};

export default AsideRight;
