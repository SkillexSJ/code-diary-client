import React from "react";
import { PointerHighlight } from "../../../Components/Ui/PointerHighlight";
import ShiningButton from "../../../Components/Ui/Button";
import { CodeBlock } from "../../../Components/Ui/CodeBlock";
import { GlowingEffect } from "../../../Components/Ui/GlowingEffect";

const SectionTwo = () => {
  const code = `#include <iostream>
using namespace std;

void greetUser(string name) {
    cout << "Hello, " << name << "! Welcome to C++ 🎉" << endl;
}

int main() {

    string userName;

    cout << "Enter your name: ";
    cin >> userName;

  
    greetUser(userName);

    // Basic loop example
    for (int i = 1; i <= 5; i++) {
        cout << "C++ is awesome! [" << i << "]" << endl;
    }

    return 0;
}
`;
  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
        {/* Right Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-[64px] lg:text-[89.76px] font-bold text-white mb-6">
            <PointerHighlight
              rectangleClassName="bg-neutral-200 dark:bg-[#6b46c1] dark:border-neutral-600 leading-loose"
              pointerClassName=" h-3 w-3"
              containerClassName="inline-block mr-1"
            >
              <span className="relative z-10">Showcase</span>
            </PointerHighlight>{" "}
            Your Code
          </h2>
          <p className="text-base sm:text-lg text-white mb-6 max-w-xl mx-auto md:mx-0">
            Upload, share, and showcase your code with the community. Get
            feedback, improve your skills, and inspire others with your work.
          </p>
          <ShiningButton className="px-6 py-2 text-sm sm:text-base">
            Add Your Code!
          </ShiningButton>
        </div>

        {/* Left Placeholder Image */}
        <div className="flex-1 w-full">
          <div className="w-full h-full  md:h-full  rounded-full">
            <CodeBlock
              language="cpp"
              filename="CodeDiary.cpp"
              highlightLines={[9, 13, 14, 18]}
              code={code}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
