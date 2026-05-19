"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./wedding.css";

export default function WeddingInvitationPage() {
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const weddingDate = new Date("2026-05-30T11:00:00+06:00");

    const updateCountdown = () => {
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
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

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
    <main className="min-h-screen overflow-x-hidden bg-[#f4efe7] text-[#3e4236]">
      {!opened ? (
        <section className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(214,193,154,0.35),transparent_35%),linear-gradient(135deg,#fbf7ef,#e8efe7)] px-5 py-8">
          <div className="w-full max-w-[500px] rounded-[32px] border border-[#d6c19a]/50 bg-[#fffdf7]/90 px-6 py-10 text-center shadow-[0_24px_70px_rgba(63,67,54,0.16)] backdrop-blur-md">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#5f7464]">
              Wedding Invitation
            </p>

            <button
              type="button"
              onClick={() => setOpened(true)}
              aria-label="Open wedding invitation"
              className="group mx-auto block border-0 bg-transparent p-0"
            >
              <div className="envelope relative mx-auto h-[190px] w-[290px] transition duration-300 group-hover:-translate-y-2 group-hover:scale-[1.03] max-[420px]:h-[170px] max-[420px]:w-[250px]">
                <div className="envelope-letter absolute left-[35px] right-[35px] top-0 z-[2] flex h-[145px] items-center justify-center rounded-2xl border border-[#d6c19a]/80 bg-[#fffdf7] shadow-lg max-[420px]:left-[28px] max-[420px]:right-[28px] max-[420px]:h-[130px]">
                  <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full border border-[#5f7464]/50 bg-white/90 p-3 shadow-sm max-[420px]:h-[74px] max-[420px]:w-[74px]">
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

                <div className="envelope-body absolute inset-x-0 bottom-0 top-[45px] overflow-hidden rounded-b-[20px] border-2 border-[#5f7464]/30 bg-gradient-to-br from-[#eef5ee] to-white shadow-[0_18px_40px_rgba(63,67,54,0.2)]"></div>

                <div className="envelope-flap absolute inset-x-0 top-[45px] z-[3] h-[118px] border-2 border-[#5f7464]/30 bg-[#dfeadf] transition duration-500"></div>
              </div>
            </button>

            <h1 className="mt-6 font-serif text-4xl font-semibold md:text-5xl">
              Tap to Open
            </h1>

            <p className="mx-auto mt-3 max-w-[350px] text-sm leading-6 text-[#74766a]">
              You are warmly invited to celebrate a beautiful beginning.
            </p>
          </div>
        </section>
      ) : (
        <section className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(220,231,220,0.95),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(214,193,154,0.25),transparent_34%),#f4efe7] px-3 py-3">
          <div className="invitation-card relative flex w-full max-w-[980px] overflow-hidden rounded-[24px] border border-[#d6c19a]/50 bg-[#fffdf7]/95 text-center shadow-[0_28px_80px_rgba(63,67,54,0.16)]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#dce7dc]/70 blur-sm"></div>
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#d6c19a]/30 blur-sm"></div>

            <div className="relative z-10 grid w-full grid-cols-1 gap-4 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-7">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-[#d6c19a]/40 bg-white/45 px-4 py-4">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-[#5f7464]/40 bg-white/90 p-2 shadow-sm">
                  <Image
                    src="/logo.png"
                    alt="Wedding logo"
                    width={70}
                    height={70}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>

                <div className="mb-2 text-2xl md:text-[30px]">
                  بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </div>

                <p className="mb-4 text-xs font-bold uppercase leading-5 tracking-wide">
                  “In the name of Allah,
                  <br />
                  the most gracious & the most merciful”
                </p>

                <p className="mb-3 max-w-[360px] text-xs font-bold uppercase leading-5 tracking-wide md:text-sm">
                  We are inviting you to celebrate the wedding ceremony of
                </p>

                <h2 className="font-[cursive] text-[34px] leading-tight md:text-[42px]">
                  Marufa Yeasmin Misu
                </h2>

                <p className="mt-1 text-[11px] font-extrabold uppercase tracking-wide md:text-xs">
                  Youngest daughter of Md. Mokbul Hossain
                </p>

                <div className="my-2 font-serif text-3xl text-[#5f7464]">&</div>

                <h2 className="font-[cursive] text-[34px] leading-tight md:text-[42px]">
                  Md Taufik Hasan Tusher
                </h2>

                <p className="mt-1 text-[11px] font-extrabold uppercase tracking-wide md:text-xs">
                  Elder son of A.H.M Saiful Islam
                </p>
              </div>

              <div className="flex flex-col justify-center px-2 py-2">
                <div className="mx-auto grid w-full max-w-[480px] grid-cols-[1fr_auto_1fr] items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <span className="h-[2px] w-full bg-[#5f7464]/70"></span>
                    <strong className="text-sm uppercase tracking-wide md:text-base">
                      Saturday
                    </strong>
                    <span className="h-[2px] w-full bg-[#5f7464]/70"></span>
                  </div>

                  <div>
                    <p className="text-lg font-extrabold uppercase">May</p>
                    <h3 className="font-serif text-7xl font-bold leading-none text-[#5f7464] md:text-8xl">
                      30
                    </h3>
                    <p className="text-xl font-extrabold uppercase">2026</p>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <span className="h-[2px] w-full bg-[#5f7464]/70"></span>
                    <strong className="text-sm uppercase tracking-wide md:text-base">
                      11:00 AM
                    </strong>
                    <span className="h-[2px] w-full bg-[#5f7464]/70"></span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="font-[cursive] text-4xl text-[#3e4236]">
                    Venue
                  </p>

                  <h4 className="mt-1 text-base font-extrabold uppercase tracking-wide md:text-xl">
                    Quince Restaurant, Kanaikhali, Natore
                  </h4>

                  <p className="mt-1 text-sm font-bold uppercase md:text-base">
                    2nd Floor Convention Hall
                  </p>
                </div>

                <div className="mx-auto mt-5 w-full max-w-[390px] rounded-2xl border border-[#5f7464]/20 bg-[#dce7dc]/70 px-4 py-3">
                  <p className="text-xs font-extrabold uppercase tracking-widest">
                    Countdown
                  </p>

                  <strong className="mt-1 block text-lg text-[#5f7464] md:text-2xl">
                    {timeLeft || "Loading..."}
                  </strong>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-extrabold uppercase tracking-widest">
                    RSVP
                  </p>

                  <a
                    href="tel:+8801701030436"
                    className="mt-1 inline-block text-lg font-extrabold text-[#3e4236] no-underline"
                  >
                    +8801701030436
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Quince+Restaurant+Kanaikhali+Natore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#5f7464] px-5 py-2.5 text-xs font-bold text-white shadow-[0_12px_26px_rgba(95,116,100,0.28)] transition hover:-translate-y-1 md:text-sm"
                  >
                    View Map
                  </a>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="rounded-full bg-[#5f7464] px-5 py-2.5 text-xs font-bold text-white shadow-[0_12px_26px_rgba(95,116,100,0.28)] transition hover:-translate-y-1 md:text-sm"
                  >
                    {copied ? "Copied!" : "Share"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpened(false)}
                    className="rounded-full border border-[#5f7464]/30 bg-white px-5 py-2.5 text-xs font-bold text-[#5f7464] transition hover:-translate-y-1 md:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}