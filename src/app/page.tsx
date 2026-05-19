"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./wedding.css";

export default function WeddingInvitationPage() {
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const weddingDate = new Date("2026-05-30T11:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("The ceremony has started");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const handleShare = async () => {
    const shareData = {
      title: "Wedding Invitation",
      text: "You are invited to the wedding ceremony of Marufa Yeasmin Misu & Md Taufik Hasan Tusher.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#3e4236]">
      {!opened ? (
        <section className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(214,193,154,0.35),transparent_35%),linear-gradient(135deg,#fbf7ef,#e8efe7)] px-5 py-10">
          <div className="w-full max-w-[540px] rounded-[32px] border border-[#d6c19a]/50 bg-[#fffdf7]/90 px-6 py-12 text-center shadow-[0_24px_70px_rgba(63,67,54,0.16)] backdrop-blur-md md:px-10">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.35em] text-[#5f7464]">
              Wedding Invitation
            </p>

            <button
              type="button"
              onClick={() => setOpened(true)}
              aria-label="Open wedding invitation"
              className="group mx-auto block border-0 bg-transparent p-0"
            >
              <div className="envelope relative mx-auto h-[205px] w-[310px] transition duration-300 group-hover:-translate-y-2 group-hover:scale-[1.03] max-[420px]:h-[175px] max-[420px]:w-[255px]">
                <div className="envelope-letter absolute left-[35px] right-[35px] top-0 z-[2] flex h-[155px] items-center justify-center rounded-2xl border border-[#d6c19a]/80 bg-[#fffdf7] shadow-lg max-[420px]:left-[28px] max-[420px]:right-[28px] max-[420px]:h-[132px]">
                  <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full border border-[#5f7464]/50 bg-white/90 p-3 shadow-sm max-[420px]:h-[78px] max-[420px]:w-[78px]">
                    <Image
                      src="/logo.png"
                      alt="Wedding logo"
                      width={90}
                      height={90}
                      className="h-full w-full object-contain"
                      priority
                    />
                  </div>
                </div>

                <div className="envelope-body absolute inset-x-0 bottom-0 top-[48px] overflow-hidden rounded-b-[20px] border-2 border-[#5f7464]/30 bg-gradient-to-br from-[#eef5ee] to-white shadow-[0_18px_40px_rgba(63,67,54,0.2)]"></div>

                <div className="envelope-flap absolute inset-x-0 top-[48px] z-[3] h-[125px] border-2 border-[#5f7464]/30 bg-[#dfeadf] transition duration-500"></div>
              </div>
            </button>

            <h1 className="mt-7 font-serif text-4xl font-semibold text-[#3e4236] md:text-6xl">
              Tap to Open
            </h1>

            <p className="mx-auto mt-3 max-w-[370px] leading-7 text-[#74766a]">
              You are warmly invited to celebrate a beautiful beginning.
            </p>
          </div>
        </section>
      ) : (
        <section className="flex min-h-screen justify-center bg-[radial-gradient(circle_at_top_right,rgba(220,231,220,0.95),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(214,193,154,0.25),transparent_34%),#f4efe7] px-4 py-8">
          <div className="relative w-full max-w-[760px] overflow-hidden rounded-[26px] border border-[#d6c19a]/50 bg-[#fffdf7]/95 px-5 py-10 text-center shadow-[0_28px_80px_rgba(63,67,54,0.16)] md:px-16 md:py-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#dce7dc]/60 blur-sm"></div>
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#d6c19a]/30 blur-sm"></div>

            <div className="relative z-10">
              <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-[#5f7464]/40 bg-white/90 p-3 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Wedding logo"
                  width={90}
                  height={90}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>

              <div className="mb-3 text-3xl text-[#3e4236] md:text-4xl">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>

              <p className="mx-auto mb-10 max-w-[560px] text-sm font-bold uppercase leading-7 tracking-wide md:text-lg">
                “In the name of Allah,
                <br />
                the most gracious & the most merciful”
              </p>

              <p className="mx-auto mb-8 max-w-[570px] text-base font-bold uppercase leading-8 tracking-wide md:text-xl">
                We are inviting you to celebrate the wedding ceremony of
              </p>

              <h2 className="font-[cursive] text-5xl leading-tight text-[#3e4236] md:text-7xl">
                Marufa Yeasmin Misu
              </h2>

              <p className="mt-3 text-sm font-extrabold uppercase tracking-wide md:text-xl">
                Youngest daughter of Md. Mokbul Hossain
              </p>

              <div className="my-7 font-serif text-5xl text-[#5f7464]">&</div>

              <h2 className="font-[cursive] text-5xl leading-tight text-[#3e4236] md:text-7xl">
                Md Taufik Hasan Tusher
              </h2>

              <p className="mt-3 text-sm font-extrabold uppercase tracking-wide md:text-xl">
                Elder son of A.H.M Saiful Islam
              </p>

              <div className="mx-auto my-10 grid max-w-[650px] grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
                <div className="flex flex-col items-center gap-2">
                  <span className="h-[2px] w-full max-w-[170px] bg-[#5f7464]/70"></span>
                  <strong className="text-lg uppercase tracking-wide">
                    Saturday
                  </strong>
                  <span className="h-[2px] w-full max-w-[170px] bg-[#5f7464]/70"></span>
                </div>

                <div>
                  <p className="text-xl font-extrabold uppercase">May</p>
                  <h3 className="font-serif text-8xl font-bold leading-none text-[#5f7464] md:text-[116px]">
                    30
                  </h3>
                  <p className="text-2xl font-extrabold uppercase">2026</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="h-[2px] w-full max-w-[170px] bg-[#5f7464]/70"></span>
                  <strong className="text-lg uppercase tracking-wide">
                    At 11:00 AM
                  </strong>
                  <span className="h-[2px] w-full max-w-[170px] bg-[#5f7464]/70"></span>
                </div>
              </div>

              <div className="mt-7">
                <p className="font-[cursive] text-5xl text-[#3e4236]">
                  Venue
                </p>

                <h4 className="mt-1 text-lg font-extrabold uppercase tracking-wide md:text-2xl">
                  Quince Restaurant, Kanaikhali, Natore
                </h4>

                <p className="mt-2 text-base font-bold uppercase md:text-lg">
                  2nd Floor Convention Hall
                </p>
              </div>

              <div className="mx-auto mt-9 max-w-[430px] rounded-2xl border border-[#5f7464]/20 bg-[#dce7dc]/70 px-5 py-4">
                <p className="text-sm font-extrabold uppercase tracking-widest">
                  Countdown
                </p>

                <strong className="mt-1 block text-xl text-[#5f7464] md:text-3xl">
                  {timeLeft}
                </strong>
              </div>

              <div className="mt-8">
                <p className="text-lg font-extrabold uppercase tracking-widest">
                  RSVP
                </p>

                <a
                  href="tel:+8801701030436"
                  className="mt-1 inline-block text-xl font-extrabold text-[#3e4236] no-underline"
                >
                  +8801701030436
                </a>
              </div>

              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Quince+Restaurant+Kanaikhali+Natore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#5f7464] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(95,116,100,0.28)] transition hover:-translate-y-1"
                >
                  View Map
                </a>

                <button
                  type="button"
                  onClick={handleShare}
                  className="rounded-full bg-[#5f7464] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(95,116,100,0.28)] transition hover:-translate-y-1"
                >
                  {copied ? "Copied!" : "Share Invitation"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpened(false)}
                  className="rounded-full border border-[#5f7464]/30 bg-white px-6 py-3 text-sm font-bold text-[#5f7464] transition hover:-translate-y-1"
                >
                  Close Card
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}