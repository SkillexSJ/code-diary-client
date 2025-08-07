import React from "react";
import { Lock } from "lucide-react";
import { IconError404 } from "@tabler/icons-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white px-4">
      <IconError404 className="w-[200px] h-[200px] text-pink-500 animate-pulse mb-8" />
      {/* <h1 className="text-9xl font-extrabold tracking-wide mb-4 select-none"></h1>
      <p className="text-3xl md:text-4xl font-semibold mb-6">
        ERROR HAPPENED!!
      </p>
      <p className="max-w-xl text-center text-purple-300 text-lg md:text-xl">
        Sorry, this page is not available
      </p> */}
    </div>
  );
}
