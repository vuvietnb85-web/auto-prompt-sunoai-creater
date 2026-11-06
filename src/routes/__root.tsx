import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { BrowserLock } from "@/components/browser-lock";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

import { VxoBinanceRef } from "@/components/vxo-binance-ref";
const APP_NAME = "PHỔ VÀNG";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
      },
      { title: APP_NAME },
      { name: "theme-color", content: "#071422" },
      { name: "google", content: "notranslate" },
      { name: "description", content: "Đo phổ, đối chiếu kho khí nhạc và viết prompt Suno đúng 4:20." },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="vi" className="notranslate" translate="no" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="notranslate" translate="no">
        <PreviewHostBridge />
        <BrowserLock />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <VxoBinanceRef />
        <Scripts />
      </body>
    </html>
  ),
});
