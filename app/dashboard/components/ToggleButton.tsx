// components/ToggleButton.tsx
import { FaArrowLeft, FaArrowRight, FaUser } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const ToggleButton = ({ isRender, onClick, side }: { isRender: boolean, onClick: () => void, side: 'left' | 'right' }) => {
  const positionClass = side === 'right' ? 'right-[16rem]' : 'left-[24rem]';
  const arrowIcon = side === 'right' ?
    (isRender ? <FaArrowRight size={24} /> : <FaArrowLeft size={24} />) : (isRender ? <FaArrowLeft size={24} /> : <FaArrowRight size={24} />);

  const mainControls = useAnimation();
  const initialX = side === "left" ? -386 : 256

  useEffect(() => {
    if (isRender) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isRender]);

  return (
    <motion.button
      onClick={onClick}
      animate={mainControls}
      variants={{
        hidden: { x: initialX, opacity: 1 },
        visible: { x: 0, opacity: 1 },
      }}
      initial="visible"
      transition={{ duration: 0.5, delay: 0 }}
      className={`fixed flex flex-col gap-4 items-center border-amber-200
        border-y border-${side === 'right' ? 'l' : 'r'} 
        bottom-1/2 ${positionClass} z-50 text-amber-200 bg-gray-700 rounded-${side === 'right' ? 'l' : 'r'}-md p-1 py-1.5`}
    >
      {side === 'right' ? <FaUser size={24} /> : <MdEventAvailable size={26} />}
      <div>{arrowIcon}</div>
    </motion.button>
  );
};

export default ToggleButton;
