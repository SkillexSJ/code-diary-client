import React from "react";
import { motion } from "framer-motion";

import Hero from "../../Components/DaisyUI/Hero";
import WhatCan from "./Sections/WhatCan";
import Contact from "./Sections/Contact";
import SectionOne from "./Sections/SectionOne";
import SectionTwo from "./Sections/SectionTwo";
import Footer from "../../Components/DaisyUI/Footer";

// Reusable Animated Section Component
const AnimatedSection = ({ children, direction = "up" }) => {
  const variants = {
    up: { opacity: 0, y: 40 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
  };

  const visible = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.section
      initial={variants[direction]}
      whileInView={visible}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="px-4 py-10 md:px-10 lg:px-16"
    >
      {children}
    </motion.section>
  );
};

// Animated Gradient Divider
const AnimatedDivider = () => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
    className="origin-left h-[2px] w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-60 rounded-full my-4"
  />
);

const Home = () => {
  return (
    <div className="flex flex-col gap-10 min-h-screen">
      {/* Hero Section */}
      <AnimatedSection direction="up">
        <Hero />
      </AnimatedSection>
      <AnimatedDivider />

      {/* WhatCan Section */}
      <AnimatedSection direction="left">
        <WhatCan />
      </AnimatedSection>
      <AnimatedDivider />

      {/* SectionOne */}
      <AnimatedSection direction="right">
        <SectionOne />
      </AnimatedSection>
      <AnimatedDivider />

      {/* SectionTwo */}
      <AnimatedSection direction="left">
        <SectionTwo />
      </AnimatedSection>
      <AnimatedDivider />

      {/* Contact Section with Delayed Animation */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Contact />
      </motion.div>

      <AnimatedDivider />

      {/* add the footer */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;
