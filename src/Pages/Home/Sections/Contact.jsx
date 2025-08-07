import React from "react";
import ScrollVelocity from "../../../Components/Ui/ScrollVelocity";

const Contact = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10 px-4 text-center">
      <div>
        <h1 className="text-4xl text-white md:text-[64px] lg:text-[89.76px] font-bold">
          Supported Languages
        </h1>
      </div>
      <div className="w-full overflow-hidden">
        <ScrollVelocity
          texts={[
            <div className="flex gap-10 items-center whitespace-nowrap">
              <img
                src="/c-plusplus.svg"
                alt="C++"
                className="w-24 h-10 object-contain"
              />
              <img
                src="/c-sharp.svg"
                alt="C#"
                className="w-12 h-10 object-contain"
              />
              <img
                src="/java.svg"
                alt="Java"
                className="w-12 h-10 object-contain"
              />
              <img
                src="/python.svg"
                alt="Python"
                className="w-12 h-10 object-contain"
              />
              <img
                src="/javascript.svg"
                alt="JavaScript"
                className="w-12 h-10 object-contain"
              />
              <img
                src="/react.svg"
                alt="React"
                className="w-12 h-10 object-contain"
              />
              <img
                src="/vite.svg"
                alt="Vite"
                className="w-12 h-10 object-contain"
              />
            </div>,
          ]}
          velocity={70}
          className="custom-scroll-text opacity-70"
        />
      </div>
    </div>
  );
};

export default Contact;
