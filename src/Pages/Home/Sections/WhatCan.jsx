import React from "react";
import Cards from "../../../Components/DaisyUI/Cards";
import { PointerHighlight } from "../../../Components/Ui/PointerHighlight";

const data = [
  {
    title: "Store Codes",
    desc: "Store Your Approach And Logic In A Single Place",
  },
  {
    title: "Edit Codes",
    desc: "Edit Your Codes And Logic In A Single Place",
  },
  {
    title: "Share Codes",
    desc: "Share Your Codes With Others And Get Feedback",
  },
];

const WhatCan = () => {
  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col justify-center gap-10">
        <h2 className="text-4xl text-white lg:text-[82.4px] font-bold text-center md:text-left">
          <PointerHighlight
            rectangleClassName="bg-neutral-200 dark:bg-[#6b46c1] dark:border-neutral-600 leading-loose"
            pointerClassName=" h-3 w-3"
            containerClassName="inline-block mr-1"
          >
            <span className="relative z-10">What</span>
          </PointerHighlight>
          can you do?
        </h2>

        {/* Mobile: horizontal scroll | Desktop: grid */}
        <div className="flex gap-6 overflow-x-auto md:overflow-visible md:grid md:grid-cols-3 scrollbar-none">
          {data.map((item, index) => (
            <div
              key={index}
              className="min-w-[80%] sm:min-w-[300px] md:min-w-0 flex-shrink-0"
            >
              <Cards title={item.title} desc={item.desc} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatCan;
