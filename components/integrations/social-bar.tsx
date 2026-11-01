"use client";

import { useEffect, useRef } from "react";
import { adsterra } from "@/config/adsterra";

export function SocialBar() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.querySelector('script[data-rre-social-bar]')) return;
    const script = document.createElement("script");
    script.src = adsterra.social.src;
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-rre-social-bar", "1");
    host.appendChild(script);
    // Root layout persists across client-side routes, so Social Bar loads once.
    // Do not remove a pending vendor request on a timeout or in no-fill cases.
  }, []);

  return <div ref={hostRef} data-social-bar-root />;
}
