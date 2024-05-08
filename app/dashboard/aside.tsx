"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export const Aside = () => {
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
        className={`flex fixed h-screen top-12 pt-2 right-0 z-40 
    
       `}
      >
        <div className="relative h-full">
          <div
            className={`h-full bg-slate-900 w-full max-w-64 ${
              isRender ? "" : ""
            }`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi hic
            facere suscipit architecto sequi fuga totam, dolorem voluptatem
            nihil, nemo cupiditate! Nesciunt harum similique ipsa, quas totam
            molestiae officia unde? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Earum sunt harum, blanditiis quasi dicta similique
            fugiat sit eaque eligendi doloribus corporis porro temporibus fugit
            impedit culpa itaque error laudantium. Animi?
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
        className="fixed
    bottom-0 right-[16rem] z-50 text-white bg-slate-900 rounded-l-md"
      >
        {!isRender ? "<=" : "=>"}
      </motion.button>
    </>
  );
};
