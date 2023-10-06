import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/site.config";

const notojp = Noto_Sans_JP({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body className={notojp.className}>
                <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
                    <Navbar />
                    <main className="w-full pb-12 px-4">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
