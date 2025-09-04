import "./globals.css";
import { ReactQueryClientProvider } from "./providers";

export const metadata = {
  title: "Carers Events",
  description: "Search events with filters",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="bg-gray-50 text-gray-900">
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}