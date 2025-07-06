import type { Metadata } from "next";
import "../styles/index.scss";

export const metadata: Metadata = {
  title: 'Todo Kanban Board',
  description: 'A simple Kanban board with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}