import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata = {
  title: "Deal Drop",
  description: "Your go-to price tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
