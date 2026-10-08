import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/styles/sites/cobfoods-com-3b75ee17/site.css";

const SEO = "/sites/cobfoods-com-3b75ee17/shared/seo";
const title = "Cob | Sorghum-Based Snack Food for Energy, Digestion & Performance";
const description =
  "Cob makes foods powered by ancient supergrain sorghum that deliver steady energy, gut-friendly prebiotic fiber, antioxidants, and natural GLP-1 support. Made with simple ingredients you’d find in your own kitchen. Co-founded by Novak Djokovic.";

export const metadata: Metadata = {
  title,
  description,
  robots: "noindex",
  icons: {
    icon: [{ url: `${SEO}/favicon-32.png`, sizes: "32x32", type: "image/png" }],
    apple: { url: `${SEO}/apple-touch-icon.png`, sizes: "180x180" },
  },
  openGraph: { title, description, siteName: "Cob", type: "website", images: `${SEO}/og-image.png` },
  twitter: { card: "summary_large_image", title, description, images: `${SEO}/og-image.png` },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * The theme's scroll engine tags <html> before first paint: the browser name (some rules
 * target html.firefox / html.safari) and has-scroll-init + has-scroll-smooth|native, which
 * arm every reveal animation. Doing it inline avoids a flash of un-armed content.
 */
const bootScript = `(function(){var h=document.documentElement,u=navigator.userAgent,b=/firefox/i.test(u)?"firefox":/edg\\//i.test(u)?"edge":/chrome|crios/i.test(u)?"chrome":/safari/i.test(u)?"safari":"";if(b)h.classList.add(b);var t=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(u)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);h.classList.add("has-scroll-init",t?"has-scroll-native":"has-scroll-smooth");try{h.style.setProperty("--scrollbar-width",(window.innerWidth-h.clientWidth)+"px")}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The boot script and the scroll engine add classes / CSS variables to <html> and <body> at runtime.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="index --site-alert-activated --logo-retracted" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
