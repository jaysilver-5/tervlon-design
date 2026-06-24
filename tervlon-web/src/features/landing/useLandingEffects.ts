"use client";
import { useEffect } from "react";

/** Nav-background-on-scroll + reveal-on-scroll, matching the static landing. */
export function useLandingEffects() {
  useEffect(() => {
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);
}
