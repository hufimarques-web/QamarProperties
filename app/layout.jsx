import "./globals.css";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { SITE, SITE_URL } from "@/lib/site";
import { MobileTabBar } from "@/components/shared/MobileTabBar";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1C1719",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vender casa em Aveiro com valor líquido | Qamar Properties",
    template: "%s | Qamar Properties",
  },
  description:
    "Quer vender casa em Aveiro? Diga quanto quer receber. Mostramos-lhe o estudo de mercado, vendemos em 60 dias e só ganhamos com o que vendermos acima do seu valor.",
  keywords: [
    "vender casa Aveiro",
    "vender apartamento Aveiro",
    "vender moradia Aveiro",
    "imobiliária Aveiro",
    "mediação imobiliária Aveiro",
    "valor líquido",
    "vender casa sem comissão",
    "comprar casa Aveiro",
    "casas à venda Aveiro",
    "Ílhavo",
    "Esgueira",
  ],
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: SITE.name,
    url: "/",
    title: "Diga quanto quer receber. Vendemos em 60 dias.",
    description: SITE.shortDescription,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Qamar Properties — venda com valor líquido em Aveiro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diga quanto quer receber. Vendemos em 60 dias.",
    description: SITE.shortDescription,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_URL}/#empresa`,
  name: SITE.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo/qamar-logo-dark.png`,
  image: `${SITE_URL}/og.jpg`,
  description: SITE.shortDescription,
  telephone: SITE.phone,
  ...(SITE.email ? { email: SITE.email } : {}),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aveiro",
    addressRegion: "Aveiro",
    addressCountry: "PT",
  },
  areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
  knowsLanguage: ["pt-PT"],
  ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#site`,
  url: SITE_URL,
  name: SITE.name,
  inLanguage: "pt-PT",
  publisher: { "@id": `${SITE_URL}/#empresa` },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/intro/hero.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationLd, websiteLd]) }}
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
        {/* Espaço para a barra inferior do telemóvel não tapar o rodapé */}
        <div className="h-[calc(60px+env(safe-area-inset-bottom))] bg-[#141011] md:hidden" aria-hidden="true" />
        <MobileTabBar />
      </body>
    </html>
  );
}
