import "./globals.css";
import { GodRaysBackground } from "@/components/GodRaysBackground";

export const metadata = {
  title: "Capital Atlântico — Investimento Imobiliário em Portugal",
  description: "Acesso exclusivo a operações de fix and flip com retorno de 15 a 30%. Contratos blindados, supervisão regulatória e transparência total.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <GodRaysBackground />
        {children}
      </body>
    </html>
  );
}
