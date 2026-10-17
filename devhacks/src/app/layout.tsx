import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Writer — Tailored AI Writing for Students, Professionals & Creators",
  description:
    "Enhance text with AI: Tones, hooks, plagiarism checks, and more—local-first, explainable. Built for DevHacks 2026.",
  keywords: ["AI writer", "text enhancement", "plagiarism checker", "tone rewriting", "hook generator"],
  openGraph: {
    title: "AI Writer — Tailored AI Writing",
    description: "Enhance text with AI: Tones, hooks, plagiarism checks, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased min-h-screen" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        {children}
      </body>
    </html>
  );
}
