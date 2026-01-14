"use client";

import { ZonesList } from "@/components/ZonesList";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
        Automotus Prototype Home
      </h1>

      <ZonesList />
    </>
  );
}
