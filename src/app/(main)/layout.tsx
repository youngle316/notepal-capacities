import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
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
          <Toaster position="top-center" />
        </div>
      </body>
    </html>
  );
}
