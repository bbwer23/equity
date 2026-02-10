import "./globals.css";

export const metadata = {
  title: "AI Copy Concierge",
  description: "AI-generated copy for busy marketers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
