import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/DaisyUI/Navbar";
import Footer from "../Components/DaisyUI/Footer";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const AnimatedDivider = () => (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="origin-left h-[2px] w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-60 rounded-full mb-10"
    />
  );
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <Toaster position="top-left" reverseOrder={false} />

      <header className="p-5 lg:sticky lg:top-0 lg:z-50 ">
        <Navbar></Navbar>
      </header>

      <main className="">
        <Outlet></Outlet>
      </main>

      {/* <footer className="">
        <AnimatedDivider></AnimatedDivider>
        <Footer></Footer>
      </footer> */}
    </div>
  );
};

export default MainLayout;
