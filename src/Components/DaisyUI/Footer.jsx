import React from "react";
import { FloatingDock } from "../Ui/FloatingDeck";
import {
  IconBrandBehance,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import TextPressure from "../Ui/TextPressure";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="mb-2">FOLLOW ME</p>
        {/* <h1 className="text-[82.4px] text-white tracking-widest">SKILLEX</h1> */}
        <div>
          <FloatingDock
            desktopClassName="bg-white"
            mobileClassName={"hidden"}
            items={[
              {
                title: "Twitter",
                icon: <IconBrandTwitter className="text-[#1DA1F2]" />,
                href: "https://twitter.com",
              },
              {
                title: "LinkedIn",
                icon: <IconBrandBehance className="text-[#0077B5]" />,

                href: "https://linkedin.com",
              },
              {
                title: "GitHub",
                icon: <IconBrandGithub />,
                href: "https://github.com/SkillexSJ",
              },
              // facebook
              {
                title: "Facebook",
                icon: <IconBrandFacebook className="text-[#3b5998]" />,
                href: "https://www.facebook.com/SkillexSJ7",
              },
              //instagram
              {
                title: "Instagram",
                icon: <IconBrandInstagram className="text-[#E4405F]" />,
                href: "https://www.instagram.com/skillex_sajid/",
              },
            ]}
          ></FloatingDock>
          <div className="flex flex-col items-center justify-center mb-5 gap-4 md:hidden">
            <div className="flex gap-4">
              <IconBrandTwitter
                href="https://twitter.com"
                className="text-[#1DA1F2]"
              />
              <IconBrandLinkedin className="text-[#0077B5]" />
              <IconBrandGithub />
              <IconBrandFacebook className="text-[#3b5998]" />
              <IconBrandInstagram className="text-[#E4405F]" />
            </div>
          </div>
        </div>
        <div className="w-screen mb-5 opacity-50">
          <TextPressure
            text="SKILLEX"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            textColor="#6b46c1"
            strokeColor="#ff0000"
            minFontSize={36}
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
