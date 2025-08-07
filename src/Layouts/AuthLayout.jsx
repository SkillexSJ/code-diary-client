import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/DaisyUI/Navbar";
import Footer from "../Components/DaisyUI/Footer";
import { BackgroundBeams } from "../Components/Ui/BackgroundBeams";
import { Toaster } from "react-hot-toast";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <Toaster position="top-left" reverseOrder={false} />
      {/* Full viewport animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundBeams />
      </div>

      {/* Content container positioned above the background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <header>
          <Navbar />
        </header>

        <main className="flex-grow">
          <Outlet />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
