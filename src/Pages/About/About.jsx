import React from "react";
import { motion } from "framer-motion";
import sajid from "/sajid.jpg";
import { FloatingDock } from "../../Components/Ui/FloatingDeck";
import {
  IconBrandBehance,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";

const socialLinks = [
  {
    title: "Twitter",
    icon: <IconBrandTwitter className="text-[#1DA1F2]" />,
    href: "https://twitter.com",
  },
  {
    title: "LinkedIn",
    icon: <IconBrandLinkedin className="text-[#0077B5]" />,
    href: "https://linkedin.com",
  },
  {
    title: "GitHub",
    icon: <IconBrandGithub />,
    href: "https://github.com/SkillexSJ",
  },
  {
    title: "Facebook",
    icon: <IconBrandFacebook className="text-[#3b5998]" />,
    href: "https://www.facebook.com/SkillexSJ7",
  },
  {
    title: "Instagram",
    icon: <IconBrandInstagram className="text-[#E4405F]" />,
    href: "https://www.instagram.com/skillex_sajid/",
  },
];

const About = () => {
  return (
    <>
      {/* About Section */}
      <section className="min-h-screen px-4 sm:px-6 md:px-12 py-16 sm:py-20 flex flex-col lg:flex-row items-center max-w-7xl mx-auto gap-10 sm:gap-16 text-white">
        {/* Image */}
        <motion.div
          className="flex-shrink-0 w-full max-w-sm rounded-xl overflow-hidden shadow-2xl shadow-purple-800/50"
          style={{ height: "auto", maxHeight: "500px" }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={sajid}
            alt="Author Portrait"
            className="w-full h-full object-contain rounded-xl"
            loading="lazy"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="max-w-full lg:max-w-3xl space-y-6 sm:space-y-8"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight
          bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600
          bg-clip-text text-transparent animate-text-glow"
          >
            About the Creator
          </h1>

          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-purple-300">
            Hello! I'm Sajid, a passionate full-stack developer who loves
            building tools that help programmers organize and improve their
            coding journey. This website is my personal project where I document{" "}
            <span className="font-semibold bg-white text-black px-1 rounded-md">
              code snippets
            </span>
            , concepts, and algorithms—making{" "}
            <span className="font-semibold bg-white text-black px-1 rounded-md">
              coding practice
            </span>{" "}
            more structured and enjoyable.
          </p>

          <blockquote className="border-l-4 border-purple-600 pl-6 italic text-purple-200 text-base sm:text-lg md:text-xl">
            “I created this platform to provide a seamless, beautiful experience
            for coders of all levels. Whether you're learning a new language or
            mastering algorithms, here you’ll find a powerful space to save,
            review, and grow your knowledge.”
          </blockquote>

          <p className="text-right text-purple-400 font-semibold tracking-wide text-base md:text-2xl">
            — Sajid
          </p>

          <div className="hidden md:block flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-bold text-center mb-4">MY SOCIALS</h1>

            <FloatingDock mobileClassName="hidden" items={socialLinks} />
          </div>

          <div className="flex justify-center items-center gap-4 md:hidden">
            <h1 className="text-xl font-bold">MY SOCIALS</h1>
            {socialLinks.map(({ href, icon, title }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={title}
                className="hover:scale-110 transition-transform duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Floating Dock for Desktop */}
      {/* <div className="hidden md:block ">
        <FloatingDock
          desktopClassName="bg-white"
          mobileClassName="hidden"
          items={socialLinks}
        />
      </div> */}

      {/* Social Icons for Mobile */}
      {/* <div className="flex flex-col items-center justify-center mb-6 gap-4 md:hidden">
        <div className="flex gap-4">
          {socialLinks.map(({ href, icon, title }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={title}
              className="hover:scale-110 transition-transform duration-200"
            >
              {icon}
            </a>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default About;
