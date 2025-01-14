import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Notepal Capacities",
  description: "Sync Weread bookmarks and reviews to Capacities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="mx-5 my-12 max-w-screen-lg md:mx-auto">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
