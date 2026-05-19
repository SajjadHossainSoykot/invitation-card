"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Navigation,
  Timer,
} from "lucide-react";
import "./wedding.css";

type EventInfo = {
  key: string;
  title: string;
  shortTitle: string;
  date: Date;
  badge: string;
  dayText: string;
  dateText: string;
  timeText: string;
  venueLine1: string;
  venueLine2?: string;
  mapUrl: string;
};

const EVENTS: EventInfo[] = [
  {
    key: "wedding",
    title: "Wedding Ceremony",
    shortTitle: "Wedding Ceremony",
    date: new Date("2026-05-30T11:30:00+06:00"),
    badge: "Main Event",
    dayText: "Saturday",
    dateText: "30 May 2026",
    timeText: "11:30 AM",
    venueLine1: "Quince Restaurant, Kanaikhali, Natore",
    venueLine2: "2nd Floor Convention Hall",
    mapUrl: "https://maps.app.goo.gl/Y7oV3teYAVHfGu5u5?g_st=ac",
  },
  {
    key: "reception",
    title: "Reception",
    shortTitle: "Reception",
    date: new Date("2026-05-31T00:00:00+06:00"),
    badge: "Reception",
    dayText: "Sunday",
    dateText: "31 May 2026",
    timeText: "12:00 AM",
    venueLine1: "Kazi Community Center",
    venueLine2: "Adjacent to SP Bridge (West Bank of the Korotoa River), Bogura",
    mapUrl: "https://maps.app.goo.gl/UaN3F7TVrznrdT9g7",
  },
];

type CountdownState = {
  label: string;
  value: string;
};

export default function WeddingInvitationPage() {
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState<CountdownState>({
    label: "Preparing celebration time...",
    value: "Loading...",
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      const nextEvent = EVENTS.find(
        (event) => event.date.getTime() > now.getTime()
      );

      if (!nextEvent) {
        setCountdown({
          label: "All celebration events have begun",
          value: "We look forward to celebrating with you",
        });
        return;
      }

      const diff = nextEvent.date.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({
        label: `Countdown to ${nextEvent.shortTitle}`,
        value: `${days}d ${hours}h ${minutes}m ${seconds}s`,
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "Wedding Invitation",
      text: "You are invited to the wedding ceremony and reception of Marufa Yeasmin Misu & Md Taufik Hasan Tusher.",
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
          <div className="w-full max-w-[520px] rounded-[32px] border border-[#d6c19a]/50 bg-[#fffdf7]/90 px-6 py-10 text-center shadow-[0_24px_70px_rgba(63,67,54,0.16)] backdrop-blur-md">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#5f7464]">
              Wedding Invitation
            </p>

            <button
              type="button"
              onClick={() => setOpened(true)}
              aria-label="Open wedding invitation"
              className="group mx-auto block border-0 bg-transparent p-0"
            >
              <div className="envelope relative mx-auto h-[210px] w-[310px] transition duration-300 group-hover:-translate-y-2 group-hover:scale-[1.03] max-[420px]:h-[185px] max-[420px]:w-[265px]">
                <div className="envelope-letter absolute left-[35px] right-[35px] top-0 z-[2] flex h-[165px] flex-col items-center justify-center rounded-2xl border border-[#d6c19a]/80 bg-[#fffdf7] px-4 text-center shadow-lg max-[420px]:left-[28px] max-[420px]:right-[28px] max-[420px]:h-[145px]">
                  <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-[#5f7464]/50 bg-white/90 p-2 shadow-sm max-[420px]:h-[60px] max-[420px]:w-[60px]">
                    <Image
                      src="/logo.png"
                      alt="Wedding logo"
                      width={70}
                      height={70}
                      className="h-full w-full object-contain"
                      priority
                    />
                  </div>

                  <p className="mt-2 text-[11px] font-semibold leading-5 text-[#5f7464] max-[420px]:text-[10px] max-[420px]:leading-4">
                    You are warmly invited to celebrate a beautiful new
                    beginning of
                  </p>

                  <p
                    className="mt-1 text-[28px] leading-none text-[#5f7464] max-[420px]:text-[24px]"
                    style={{ fontFamily: '"Great Vibes", cursive' }}
                  >
                    Misu & Tusher
                  </p>
                </div>

                <div className="envelope-body absolute inset-x-0 bottom-0 top-[52px] overflow-hidden rounded-b-[20px] border-2 border-[#5f7464]/30 bg-gradient-to-br from-[#eef5ee] to-white shadow-[0_18px_40px_rgba(63,67,54,0.2)]"></div>

                <div className="envelope-flap absolute inset-x-0 top-[52px] z-[3] h-[126px] border-2 border-[#5f7464]/30 bg-[#dfeadf] transition duration-500"></div>
              </div>
            </button>

            <h1 className="mt-6 font-serif text-4xl font-semibold md:text-5xl">
              Tap to Open
            </h1>

            <p className="mx-auto mt-3 max-w-[350px] text-sm leading-6 text-[#74766a]">
              You are warmly invited to celebrate a beautiful new beginning of
              Misu & Tusher.
            </p>
          </div>
        </section>
      ) : (
        <>
          <section className="flex min-h-screen items-center bg-[radial-gradient(circle_at_top_right,rgba(220,231,220,0.95),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(214,193,154,0.25),transparent_34%),#f4efe7] px-3 py-5">
            <div className="mx-auto w-full max-w-[1280px]">
              <div className="invitation-card relative w-full overflow-hidden rounded-[26px] border border-[#d6c19a]/50 bg-[#fffdf7]/95 shadow-[0_28px_80px_rgba(63,67,54,0.16)]">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#dce7dc]/70 blur-sm"></div>
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#f2eadb]/70 blur-sm"></div>

                <div className="relative z-10 grid w-full grid-cols-1 gap-4 p-4 xl:grid-cols-[0.9fr_1.1fr] xl:gap-5 xl:p-5">
                  {/* Left Panel */}
                  <div className="left-panel relative flex flex-col justify-center overflow-hidden rounded-[24px] border border-[#d6c19a]/45 bg-white/55 px-5 py-6 text-center xl:min-h-[calc(100vh-90px)]">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#5f7464]/20 bg-white p-2 shadow-sm">
                      <Image
                        src="/logo.png"
                        alt="Wedding logo"
                        width={56}
                        height={56}
                        className="h-full w-full object-contain"
                        priority
                      />
                    </div>

                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#7d8a7a]">
                      Together With Our Families
                    </p>

                    <div className="mb-3 text-[27px] leading-none text-[#3e4236] sm:text-[32px]">
                      بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                    </div>

                    <p className="mx-auto mb-5 max-w-[430px] text-xs font-bold uppercase leading-5 tracking-wide">
                      “In the name of Allah,
                      <br />
                      the most gracious & the most merciful”
                    </p>

                    <p className="mx-auto mb-4 max-w-[430px] text-xs font-bold uppercase leading-5 tracking-wide">
                      We are inviting you to celebrate the wedding ceremony of
                    </p>

                    <h2
                      className="name-text mx-auto max-w-full text-[30px] leading-[1.08] text-[#43463d] sm:text-[36px] xl:whitespace-nowrap xl:text-[40px]"
                      style={{ fontFamily: '"Great Vibes", cursive' }}
                    >
                      Marufa Yeasmin Misu
                    </h2>

                    <p className="mt-2 text-[10px] font-extrabold uppercase tracking-wide sm:text-[11px]">
                      Youngest daughter of Md. Mokbul Hossain
                    </p>

                    <div className="my-3 text-[30px] text-[#5f7464]">&</div>

                    <h2
                      className="name-text mx-auto max-w-full text-[28px] leading-[1.08] text-[#43463d] sm:text-[34px] xl:whitespace-nowrap xl:text-[38px]"
                      style={{ fontFamily: '"Great Vibes", cursive' }}
                    >
                      Md Taufik Hasan Tusher
                    </h2>

                    <p className="mt-2 text-[10px] font-extrabold uppercase tracking-wide sm:text-[11px]">
                      Elder son of A.H.M Saiful Islam
                    </p>

                    <div className="mx-auto mt-8 w-full max-w-[520px] rounded-2xl border border-[#d6c19a]/35 bg-[#f8f5ef]/90 px-4 py-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7d8a7a]">
                        Warm Invitation
                      </p>
                      <p className="mt-1 text-sm font-medium leading-6 text-[#5a5f52]">
                        Your presence will make our celebration more joyful and
                        memorable.
                      </p>
                    </div>
                  </div>

                  {/* Right Panel */}
                  <div className="right-panel flex flex-col justify-center rounded-[24px] border border-[#d6c19a]/35 bg-[#fffdf8]/60 px-4 py-4 xl:min-h-[calc(100vh-90px)]">
                    <div className="mb-3 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7d8a7a]">
                        Celebration Details
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold text-[#3e4236] sm:text-3xl">
                        Wedding & Reception
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {EVENTS.map((event) => (
                        <div
                          key={event.key}
                          className="rounded-[22px] border border-[#d6c19a]/40 bg-white/70 p-4 shadow-[0_10px_30px_rgba(63,67,54,0.06)]"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${
                                  event.key === "wedding"
                                    ? "bg-[#edf3eb] text-[#5f7464]"
                                    : "bg-[#f7efe6] text-[#8b6c54]"
                                }`}
                              >
                                {event.badge}
                              </span>

                              <h4 className="mt-3 text-lg font-extrabold text-[#3e4236] sm:text-xl">
                                {event.title}
                              </h4>

                              <div className="mt-2 flex flex-wrap gap-3 text-sm font-bold uppercase tracking-wide text-[#5f7464]">
                                <span className="inline-flex items-center gap-1.5">
                                  <CalendarDays size={15} strokeWidth={2.2} />
                                  {event.dayText}, {event.dateText}
                                </span>

                                <span className="inline-flex items-center gap-1.5">
                                  <Clock size={15} strokeWidth={2.2} />
                                  {event.timeText}
                                </span>
                              </div>
                            </div>

                            <a
                              href={event.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-[#5f7464] px-4 py-2 text-xs font-bold text-white shadow-[0_10px_24px_rgba(95,116,100,0.22)] transition hover:-translate-y-0.5"
                            >
                              <Navigation size={14} strokeWidth={2.4} />
                              Open Map
                            </a>
                          </div>

                          <div className="mt-3 rounded-2xl bg-[#faf8f3] px-4 py-3">
                            <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#7d8a7a]">
                              <MapPin size={13} strokeWidth={2.3} />
                              Venue
                            </p>

                            <p className="mt-1 text-sm font-extrabold uppercase leading-6 text-[#3e4236] sm:text-base">
                              {event.venueLine1}
                            </p>

                            {event.venueLine2 ? (
                              <p className="mt-1 text-sm font-semibold leading-6 text-[#5d6156]">
                                {event.venueLine2}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-[22px] border border-[#c8d4c7]/60 bg-[#e8efe6] px-4 py-4 text-center">
                      <p className="inline-flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#667566]">
                        <Timer size={14} strokeWidth={2.3} />
                        {countdown.label}
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-[#536a58] sm:text-2xl">
                        {countdown.value}
                      </p>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                      <div className="text-center md:text-left">
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#7d8a7a]">
                          RSVP
                        </p>

                        <a
                          href="tel:+8801701030436"
                          className="mt-1 inline-block text-lg font-extrabold text-[#3e4236] no-underline"
                        >
                          +8801701030436
                        </a>
                      </div>

                      <div className="flex flex-wrap justify-center gap-3 md:justify-end">
                        <button
                          type="button"
                          onClick={handleShare}
                          className="rounded-full bg-[#5f7464] px-5 py-2.5 text-xs font-bold text-white shadow-[0_12px_26px_rgba(95,116,100,0.28)] transition hover:-translate-y-1 sm:text-sm"
                        >
                          {copied ? "Copied!" : "Share"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setOpened(false)}
                          className="rounded-full border border-[#5f7464]/30 bg-white px-5 py-2.5 text-xs font-bold text-[#5f7464] transition hover:-translate-y-1 sm:text-sm"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="bg-[#ded9d0]/45 px-5 py-3 text-center text-xs font-normal text-[#5d6156]/50">
            Developed by:{" "}
            <a
              href="https://github.com/SajjadHossainSoykot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#4f6253]/60 underline underline-offset-4 transition hover:text-[#3e4236]"
            >
              Sajjad Hossain Soykot
            </a>
          </footer>
        </>
      )}
    </main>
  );
}