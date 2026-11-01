"use client";

import { useEffect, useState } from "react";
import { adsterra } from "@/config/adsterra";

type BannerDevice = "desktop" | "mobile";

function officialBannerDocument(device: BannerDevice): string {
  const ad = adsterra[device];
  // Adsterra's banner script may call document.write; a dedicated iframe
  // prevents a late document.write from replacing the host Next.js page.
  // Preserve GET CODE atOptions, script src and execution order verbatim.
  return `<!doctype html><html><head><meta charset="utf-8"></head>
<body style="margin:0;overflow:hidden;">
<script>
  atOptions = {
    'key' : '${ad.key}',
    'format' : 'iframe',
    'height' : ${ad.height},
    'width' : ${ad.width},
    'params' : {}
  };
<\/script>
<script src="${ad.src}"><\/script>
</body></html>`;
}

export function ResponsiveAdBanner() {
  const [device, setDevice] = useState<BannerDevice | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setDevice(media.matches ? "desktop" : "mobile");
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const ad = device ? adsterra[device] : null;
  return (
    <div className="adsterra-banner-placement" aria-label="Advertisement" data-banner-device={device ?? "pending"}>
      <span className="adsterra-label">Advertisement</span>
      {ad && device ? (
        <iframe
          key={device}
          title={`Advertisement (${device})`}
          className="adsterra-banner-frame"
          width={ad.width}
          height={ad.height}
          loading="eager"
          scrolling="no"
          referrerPolicy="strict-origin-when-cross-origin"
          srcDoc={officialBannerDocument(device)}
        />
      ) : null}
    </div>
  );
}
