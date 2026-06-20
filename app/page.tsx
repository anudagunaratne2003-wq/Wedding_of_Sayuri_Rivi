"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import guests from "@/data/guests.json";

type Guest = {
  id: string;
  name: string;
  guestCount: number;
  table: string;
};

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [notFound, setNotFound] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return (guests as Guest[])
      .filter((g) => g.name.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    setActiveIndex(-1);
    setNotFound(false);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToGuest = (guest: Guest) => {
    router.push(`/invite/${guest.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (matches.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % matches.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + matches.length) % matches.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        goToGuest(matches[activeIndex]);
      } else if (matches.length === 1) {
        goToGuest(matches[0]);
      } else {
        setNotFound(true);
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f0e8] text-[#2a2018] px-6 overflow-hidden relative">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap");

        body {
          font-family: "Cormorant Garamond", serif;
        }

        .font-serif {
          font-family: "Pinyon Script", cursive;
        }

        @keyframes riseIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .rise {
          animation: riseIn 1s ease forwards;
        }
      `}</style>

      {/* Ambient gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#d4a84b]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl text-center rise">
        <p className="uppercase tracking-[0.35em] text-[#b8923a] text-xs italic mb-4">
          You Are Cordially Invited
        </p>

        <h1 className="font-serif text-[64px] md:text-[88px] leading-none text-[#2a2018] mb-2">
          Sayuri <span className="text-[#d4a84b]">&</span> Rivi
        </h1>

        <p className="italic text-[#7a6a4a] text-lg mb-10">
          Friday, the 17th of July, 2026 · Galle Face Hotel, Colombo
        </p>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c9902a] to-transparent mx-auto mb-10" />

        <div ref={wrapperRef} className="relative text-left">
          <label
            htmlFor="guest-search"
            className="block uppercase tracking-[0.25em] text-[#b8923a] text-xs italic mb-3 text-center"
          >
            Enter Your Name To Find Your Invitation
          </label>

          <input
            id="guest-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Mr. and Mrs. Perera"
            autoComplete="off"
            className="w-full bg-white/70 border border-[#b48c3c]/35 rounded-lg px-6 py-4 text-center text-lg italic text-[#2a2018] placeholder:text-[#a09070] focus:outline-none focus:ring-2 focus:ring-[#c9902a]/50 focus:border-[#c9902a] transition"
          />

          {matches.length > 0 && (
            <ul className="absolute mt-2 w-full bg-white border border-[#b48c3c]/30 rounded-lg shadow-lg overflow-hidden z-20">
              {matches.map((g, i) => (
                <li key={g.id}>
                  <button
                    onClick={() => goToGuest(g)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-full text-left px-6 py-3 italic transition ${
                      activeIndex === i
                        ? "bg-[#c9902a] text-white"
                        : "bg-white text-[#2a2018] hover:bg-[#f5f0e8]"
                    }`}
                  >
                    {g.name}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {notFound && query.trim().length >= 2 && matches.length === 0 && (
            <p className="mt-4 text-center italic text-[#9a6a4a] text-sm">
              We couldn&apos;t find that name. Please check the spelling, or
              contact the couple directly for help.
            </p>
          )}
        </div>

        <p className="italic text-[#9a8a6a] text-sm mt-10">
          Start typing to see your invitation appear.
        </p>
      </div>
    </main>
  );
}
