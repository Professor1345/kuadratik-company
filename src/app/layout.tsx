import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Company - Your Online Store",
  description: "Best deals online on electronics, fashion, and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Main content area */}
            <main className="flex-1">{children}</main>

            {/* Toast notification system */}
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                style: {
                  background: "#1F2937", // dark gray
                  color: "#fff",
                  fontWeight: "500",
                },
                success: {
                  iconTheme: {
                    primary: "#22A24F", // brand green
                    secondary: "#fff",
                  },
                },
              }}
            />

            {/* Footer */}
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
