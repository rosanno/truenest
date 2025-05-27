import React from "react";
import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center">
        {/* Modern Animated House SVG */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F34451"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#F34451]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Roof */}
          <motion.path
            d="M3 10l9-7 9 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />

          {/* House body */}
          <motion.path
            d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.3,
            }}
          />

          {/* Door */}
          <motion.path
            d="M10 21v-6h4v6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.6,
            }}
          />

          {/* Window */}
          <motion.rect
            x="14"
            y="13"
            width="3"
            height="3"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.9,
            }}
          />
        </motion.svg>
      </div>
    </div>
  );
};

export default SplashScreen;
