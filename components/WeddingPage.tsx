"use client";

import { useEffect, useState } from "react";

type Guest = {
  id: string;
  name: string;
  guestCount: number;
  table: string;
};

export default function WeddingPage({ guest }: { guest: Guest }) {
  const [submitted, setSubmitted] = useState(false);
  const [attendingCount, setAttendingCount] = useState<number | null>(null);

  // ALL hooks must come before any early return (React Rules of Hooks)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Early return AFTER all hooks
  if (!guest) return null;

  const submitRSVP = async () => {
    if (attendingCount === null) return;

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyYcn7P1-jMf-VbiqKj5hqsZsXm2XzILcAxH0ZyDGNy_QaYvvygSOx6ieU3IUcSp0M/exec",
        {
          method: "POST",
          body: JSON.stringify({
            guestId: guest.id,
            guestName: guest.name,
            invited: guest.guestCount,
            attending: attendingCount,
            table: guest.table,
          }),
        },
      );

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Unable to submit RSVP.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#2a2018] overflow-x-hidden">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap");

        body {
          font-family: "Cormorant Garamond", serif;
        }

        .font-serif {
          font-family: "Pinyon Script", cursive;
        }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.9s ease,
            transform 0.9s ease;
        }

        .reveal.vis {
          opacity: 1;
          transform: none;
        }
      `}</style>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Desktop Background */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero/desktop_bg.png')",
          }}
        />

        {/* Mobile Background */}
        <div
          className="block md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero/mobile_bg.png')",
          }}
        />
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="uppercase tracking-[0.35em] text-[#d4a84b] text-sm italic mb-5">
            The Wedding of
          </p>

          <h1 className="font-serif text-[72px] md:text-[120px] leading-none text-[#f7e8c0] drop-shadow-2xl">
            Sayuri
            <span className="block text-[0.55em] text-[#d4a84b]">&</span>
            Rivi
          </h1>

          <p className="mt-8 text-[#e8d5a0] italic text-lg">
            Friday, the 17th of July, 2026
          </p>

          <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#d4a84b] to-transparent mx-auto my-6" />

          <p className="text-[#b8a87a] tracking-[0.18em] italic">
            — Galle Face Hotel · Colombo —
          </p>

          <div className="mt-16 text-[#b8a87a]/70 uppercase tracking-[0.25em] text-xs">
            Scroll
            <div className="w-[1px] h-10 bg-gradient-to-b from-[#d4a84b] to-transparent mx-auto mt-3" />
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-24 px-6 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <p className="reveal text-center uppercase tracking-[0.3em] text-[#b8923a] italic text-sm">
            The Canvas of Our Day
          </p>
          <h2 className="reveal text-center text-4xl md:text-5xl font-serif mt-4 mb-14">
            Wedding Details
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ["🕯", "Ceremony", "6:30 PM", "Please be seated by 6:15"],
              [
                "🥂",
                "Reception",
                "Dinner & Celebration",
                "Following the ceremony",
              ],
              ["📍", "Venue", "Galle Face Hotel", "Colombo, Sri Lanka"],
              ["🎨", "Date", "Friday, 17 July", "2026"],
            ].map(([icon, label, value, sub]) => (
              <div
                key={label}
                className="reveal bg-white/60 border border-[#b48c3c]/25 p-8 text-center shadow-sm hover:bg-white/85 transition"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <p className="uppercase tracking-[0.25em] text-[#b8923a] text-xs italic mb-2">
                  {label}
                </p>
                <h3 className="font-serif text-xl">{value}</h3>
                <p className="text-[#7a6a4a] italic mt-2">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-[#f5f0e8] to-[#ede8dc]">
        <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#c9902a] to-transparent mx-auto mb-12" />

        <p className="reveal uppercase tracking-[0.3em] text-[#b8923a] italic text-sm">
          Where we celebrate
        </p>

        <h2 className="reveal text-5xl md:text-7xl font-serif mt-4">
          Galle Face Hotel
        </h2>

        <p className="reveal italic text-[#7a6a4a] mt-4">
          Galle Face Centre Road, Colombo 03, Sri Lanka
        </p>

        <p className="reveal italic text-[#9a8a6a] text-sm mt-3">
          Est. 1864 — The oldest hotel east of Suez
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Galle+Face+Hotel+Colombo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#c9902a] text-white rounded-full hover:bg-[#b8801f] transition shadow-lg"
          >
            Get Directions
          </a>

          <a
            href="https://maps.google.com/?q=Galle+Face+Hotel+Colombo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-[#c9902a] text-[#7a6a4a] rounded-full hover:bg-white transition"
          >
            View on Map
          </a>
        </div>
      </section>

      {/* STORY */}
      <section className="py-24 px-6 bg-[#ede8dc]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="reveal uppercase tracking-[0.3em] text-[#b8923a] italic text-sm">
            Their Story
          </p>
          <h2 className="reveal text-4xl md:text-5xl font-serif mt-4 mb-10">
            A Love Painted in Colour
          </h2>

          <p className="reveal italic text-xl leading-loose text-[#4a3a2a]">
            Two architects of the beautiful — one who gives form to space, one
            who fills it with warmth and light. Their love began not with a
            grand gesture, but with the quiet certainty of two people who
            recognise something rare in each other.
          </p>

          <p className="reveal italic text-xl leading-loose text-[#4a3a2a] mt-6">
            On the 17th of July, beneath the sea breeze of Colombo&apos;s most
            storied hotel, they invite you to witness the beginning of their
            greatest creation together.
          </p>

          <div className="reveal mt-12 p-10 border-x-4 border-[#c9902a] bg-[#c9902a]/5 relative">
            <p className="font-serif italic text-2xl">
              &ldquo;I dream of painting and then I paint my dream.&rdquo;
            </p>
            <p className="italic text-[#c9902a] mt-4 tracking-[0.15em]">
              — Vincent van Gogh
            </p>
          </div>
        </div>
      </section>

      {/* CELEBRATION EXPERIENCE */}
      <section className="py-24 px-6 bg-[#f5f0e8]">
        <div className="max-w-6xl mx-auto">
          <p className="reveal text-center uppercase tracking-[0.3em] text-[#b8923a] italic text-sm">
            Experience The Celebration
          </p>

          <h2 className="reveal text-center text-4xl md:text-5xl font-serif mt-4 mb-14">
            An Evening To Remember
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎵",
                title: "Live Music",
                desc: "Enjoy an unforgettable performance by Doctor Band, bringing timeless classics and modern favourites throughout the evening.",
              },
              {
                icon: "📸",
                title: "Photo Booth",
                desc: "Capture beautiful memories with Fourmen Events' premium photo booth experience and instant keepsakes.",
              },
              {
                icon: "🍸",
                title: "Open Bar",
                desc: "A refined selection of premium spirits, whisky, wine and refreshments served throughout the evening.",
              },
              {
                icon: "🍽️",
                title: "Action Stations",
                desc: "Interactive live food stations prepared by expert chefs, offering fresh culinary delights.",
              },
              {
                icon: "🥘",
                title: "Grand Dinner Buffet",
                desc: "An exquisite buffet featuring local and international cuisine specially prepared for our guests.",
              },
              {
                icon: "💃",
                title: "Dancing & Celebration",
                desc: "Celebrate with us on the dance floor as the evening continues with music, laughter and joy.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="reveal bg-white/70 border border-[#b48c3c]/25 p-8 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-5xl mb-5 text-center">{item.icon}</div>
                <h3 className="text-2xl font-serif text-center mb-4">
                  {item.title}
                </h3>
                <p className="text-[#7a6a4a] italic text-center leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center reveal">
            <p className="italic text-[#9a8a6a] text-lg">
              Join us for an evening of music, celebration, fine dining and
              unforgettable memories.
            </p>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-24 px-6 bg-[#ede8dc]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="reveal uppercase tracking-[0.3em] text-[#b8923a] italic text-sm">
            Kindly Respond
          </p>

          <h2 className="reveal text-4xl md:text-5xl font-serif mt-4 mb-10">
            RSVP
          </h2>

          <div className="reveal bg-white/60 border border-[#b48c3c]/25 p-8 md:p-10">
            {!submitted ? (
              <>
                <div className="mb-8 text-center">
                  <p className="font-serif text-3xl">Dear {guest.name}</p>
                  <p className="italic text-[#7a6a4a] mt-3">
                    Reserved Seats: {guest.guestCount}
                  </p>
                  <p className="italic text-[#7a6a4a]">
                    Seating Arrangement: To Be Assigned
                  </p>
                </div>

                <p className="italic text-[#7a6a4a] mb-6">
                  How many guests from your party will be attending?
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {[...Array(guest.guestCount + 1)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setAttendingCount(i)}
                      className={`w-24 py-4 border rounded-lg transition ${
                        attendingCount === i
                          ? "bg-[#c9902a] text-white border-[#c9902a]"
                          : "bg-white border-[#d6c9ad]"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>

                <button
                  disabled={attendingCount === null}
                  onClick={submitRSVP}
                  className="w-full bg-[#c9902a] text-white py-4 italic rounded-lg transition hover:bg-[#b8801f] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm RSVP
                </button>

                <p className="italic text-[#9a8a6a] text-sm mt-6">
                  We would be delighted to have your presence.
                </p>
              </>
            ) : (
              <div className="py-10">
                <p className="font-serif italic text-3xl text-[#c9902a]">
                  Thank You, {guest.name}
                </p>
                <p className="italic text-[#7a6a4a] mt-4">
                  {attendingCount === 0
                    ? "Thank you for letting us know."
                    : `${attendingCount} guest${attendingCount! > 1 ? "s" : ""} will be attending.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 text-center bg-[#f5f0e8] border-t border-[#b48c3c]/15">
        <p className="font-serif text-4xl text-[#4a3a2a] mb-4">Sayuri & Rivi</p>
        <p className="italic text-[#a09070] tracking-wide">
          17 · 07 · 2026 · Galle Face Hotel, Colombo
        </p>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c9902a] to-transparent mx-auto my-6" />
        <p className="italic text-[#a09070] text-sm leading-loose">
          &ldquo;For my part I know nothing with any certainty,
          <br />
          but the sight of the stars makes me dream.&rdquo;
        </p>
      </footer>
    </main>
  );
}
