"use client";

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
    <main className="wedding-page">
      {!opened ? (
        <section className="cover-screen">
          <div className="cover-content">
            <p className="small-title">Wedding Invitation</p>

            <button
              className="envelope-wrapper"
              onClick={() => setOpened(true)}
              aria-label="Open wedding invitation"
            >
              <div className="envelope">
                <div className="envelope-flap"></div>
                <div className="envelope-body"></div>
                <div className="envelope-letter">
                  <div className="monogram">T & M</div>
                </div>
              </div>
            </button>

            <h1>Tap to Open</h1>
            <p className="cover-subtitle">
              You are warmly invited to celebrate a beautiful beginning.
            </p>
          </div>
        </section>
      ) : (
        <section className="invitation-screen">
          <div className="card-shell">
            <div className="flower flower-top">✿</div>
            <div className="flower flower-bottom">✿</div>

            <div className="bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>

            <p className="quote">
              “In the name of Allah, <br />
              the most gracious & the most merciful”
            </p>

            <p className="invite-line">
              We are inviting you to celebrate the wedding ceremony of
            </p>

            <h2 className="bride-name">Marufa Yeasmin Misu</h2>
            <p className="family-text">Youngest daughter of Md. Mokbul Hossain</p>

            <div className="ampersand">&</div>

            <h2 className="groom-name">Md Taufik Hasan Tusher</h2>
            <p className="family-text">Elder son of A.H.M Saiful Islam</p>

            <div className="date-box">
              <div className="side-date">
                <span></span>
                <strong>Saturday</strong>
                <span></span>
              </div>

              <div className="main-date">
                <p>May</p>
                <h3>30</h3>
                <p>2026</p>
              </div>

              <div className="side-date">
                <span></span>
                <strong>At 11:00 AM</strong>
                <span></span>
              </div>
            </div>

            <div className="venue">
              <p className="venue-title">Venue</p>
              <h4>Quince Restaurant, Kanaikhali, Natore</h4>
              <p>2nd Floor Convention Hall</p>
            </div>

            <div className="countdown-box">
              <p>Countdown</p>
              <strong>{timeLeft}</strong>
            </div>

            <div className="rsvp">
              <p>RSVP</p>
              <a href="tel:+8801701030436">+8801701030436</a>
            </div>

            <div className="actions">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Quince+Restaurant+Kanaikhali+Natore"
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn"
              >
                View Map
              </a>

              <button onClick={handleShare} className="action-btn">
                {copied ? "Copied!" : "Share Invitation"}
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}