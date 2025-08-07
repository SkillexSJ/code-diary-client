import React from "react";
import { Highlight } from "../../../Components/Ui/HeroHighlight";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { PointerHighlight } from "../../../Components/Ui/PointerHighlight";
import code from "/coding-folder.png";
const SectionOne = () => {
  return (
    <section className="px-6 py-16 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto flex  md:flex-row items-center lg:gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          {/* <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            className="text-3xl sm:text-4xl lg:text-[72px] font-extrabold leading-tight text-white mb-6"
          >
            <Highlight className="rounded-md">
              Store Your Code Anytime
            </Highlight>
          </motion.h1> */}

          <h1 className="text-3xl sm:text-4xl lg:text-[72px] font-extrabold leading-tight text-white mb-6">
            Store Your{" "}
            <PointerHighlight
              rectangleClassName="bg-neutral-200 dark:bg-[#6b46c1] dark:border-neutral-600 leading-loose"
              pointerClassName=" h-3 w-3"
              containerClassName="inline-block mr-1"
            >
              <span className="relative z-10">Code</span>
            </PointerHighlight>{" "}
            Anytime
          </h1>
          <p className="text-base sm:text-lg text-white max-w-xl mx-auto md:mx-0">
            Build projects, solve challenges, join coding competitions,
            collaborate with others, and grow your skills. All in one platform.
          </p>
        </div>

        {/* Right Typing Animation */}
        <div className="flex-1 w-full">
          <div className="  ">
            {/* <span>
              <Typewriter
                words={[
                  'console.log("Hello, world!");',
                  "function greet(name) {",
                  '  return "Hi, " + name;',
                  "}",
                  'greet("Sajid");',
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={30}
                delaySpeed={1000}
              />
            </span> */}
            <img src={code} className="hover:scale-110 transition duration-300 ease-in-out" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
