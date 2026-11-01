"use client";

import { useEffect, useRef } from "react";

export function NativeAdClient({ scriptUrl, containerId }: { scriptUrl: string; containerId: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.querySelector('script[data-rre-native-ad]')) return;

    // The native target must exist before the original provider script executes.
    const container = document.createElement("div");
    container.id = containerId;
    host.appendChild(container);

    const script = document.createElement("script");
    script.async = true;
    script.src = scriptUrl;
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-rre-native-ad", "1");
    host.appendChild(script);
    // No arbitrary no-fill timeout: only DOM unmount removes this instance.
  }, [containerId, scriptUrl]);

  return (
    <div className="adsterra-native-placement" aria-label="Sponsored content">
      <span className="adsterra-label">Advertisement / Sponsored</span>
      <div ref={hostRef} data-native-ad-slot />
    </div>
  );
}
