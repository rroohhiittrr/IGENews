import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This is a minimal root layout
  // The actual layout logic is in app/[locale]/layout.tsx
  return children;
}
