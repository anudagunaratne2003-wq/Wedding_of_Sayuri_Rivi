"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import WeddingPage from "./WeddingPage";

type Guest = {
  id: string;
  name: string;
  guestCount: number;
  table: string;
};

export default function InvitationIntro({ guest }: { guest: Guest }) {
  const [opened, setOpened] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setOpened(true);
    }, 1000);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4700);

    const pageTimer = setTimeout(() => {
      setShowInvitation(true);
    }, 6000);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(fadeTimer);
      clearTimeout(pageTimer);
    };
  }, []);

  if (showInvitation) {
    return <WeddingPage guest={guest} />;
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/invitation/background_2.jpg')",
      }}
      animate={{
        opacity: fadeOut ? 0 : 1,
        scale: fadeOut ? 1.04 : 1,
      }}
      transition={{
        duration: 1.3,
        ease: "easeInOut",
      }}
    >
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] z-0" />

      <div
        className="relative z-10 w-[1000px] max-w-[92vw] aspect-[2/1]"
        style={{
          perspective: "2200px",
        }}
      >
        <img
          src="/invitation/envelope-base.jpg"
          alt="Envelope Base"
          className="absolute inset-0 w-full h-full object-contain z-20 drop-shadow-2xl"
        />

        <motion.div
          className="absolute inset-0 z-40"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "50% 0%",
          }}
          initial={{ rotateX: 0 }}
          animate={
            opened
              ? {
                  rotateX: 150,
                  y: 2,
                }
              : {
                  rotateX: 0,
                  y: 0,
                }
          }
          transition={{
            duration: 3.2,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <img
            src="/invitation/envelope-flap.png"
            alt="Envelope flap front"
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              backfaceVisibility: "hidden",
            }}
          />

          <img
            src="/invitation/envelope-flap-back.png"
            alt="Envelope flap back"
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              transform: "rotateX(180deg) scaleY(-1)",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>

        <motion.img
          src="/invitation/wax-seal.png"
          alt="Wax Seal"
          className="absolute w-[100px] md:w-[200px] left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-40"
          animate={
            opened
              ? {
                  opacity: 0,
                  scale: 0,
                  rotate: 20,
                }
              : {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }
          }
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
}
