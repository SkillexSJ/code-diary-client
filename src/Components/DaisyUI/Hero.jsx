import React from "react";
import Orb from "./Orb";
import ShiningButton from "../Ui/Button";
import BlurText from "../Ui/BlurText";
import { Link } from "react-router";

const Hero = () => {
  return (
    <>
      <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 h-full w-[1300px] z-0">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      <div className="relative flex flex-col items-center justify-center gap-5 mt-10 mb-20">
        <div>
          <BlurText
            text="LETS CODE TOGETHER !"
            delay={150}
            animateBy="words"
            direction="top"
            className=" text-5xl  text-left lg:text-[89.72px]"
          />
        </div>
        <p className="block text-center text-sm sm:text-base">
          Code Diary is a platform where you can share your code with others.
          You can also learn from others by reading their code.
        </p>
        <div>
          <Link to="/dashboard">
            <ShiningButton className="px-6 py-2 text-sm sm:text-base">
              Add Your Code!
            </ShiningButton>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;

//  <ShiningButton className="px-6 py-2 text-sm sm:text-base">
//           Add Your Code!
//         </ShiningButton>
