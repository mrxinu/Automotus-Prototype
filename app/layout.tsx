"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PropsWithChildren, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { selectIsMounted, setMounted, store } from "@/state/state";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const MswWrapper = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    import("../api/mocks/browser").then(({ worker }) => {
      worker.start();
    });
  }, []);
  return <>{children}</>;
};

const AppReadyWrapper = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();
  const isMounted = useSelector(selectIsMounted);
  useEffect(() => {
    setTimeout(() => {
      dispatch(setMounted());
    }, Math.random() * 1000 + 1000); // Delay to simulate network latency between 1-2 seconds

    // Only run once, once app is mounted, it's safe for components within the app
    // to make API requests and have them intercepted by MSW.  This is not a production
    // solution!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="flex flex-col gap-4 min-h-screen justify-start bg-zinc-50 font-sans dark:bg-black min-w-sm max-w-md mx-auto py-12 px-5">
      {isMounted ? (
        children
      ) : (
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">loading...</p>
      )}
    </main>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MswWrapper>
          <Provider store={store}>
            <AppReadyWrapper>{children}</AppReadyWrapper>
          </Provider>
        </MswWrapper>
      </body>
    </html>
  );
}
