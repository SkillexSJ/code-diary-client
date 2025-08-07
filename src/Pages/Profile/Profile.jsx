import React, { useContext, useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "../../Components/Ui/BentoGrid";
import Navbar from "../../Components/DaisyUI/Navbar";
import Footer from "../../Components/DaisyUI/Footer";
import { User, Mail, Calendar, Code2 } from "lucide-react";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import TextType from "../../Components/Ui/TextType";

export function UserProfileBentoGrid() {
  const { user } = useContext(AuthContext);
  const [codeStats, setCodeStats] = useState({ total: 0, recent: [] });
  const axiosSecure = useAxiosSecure();

  const createdDateRaw = user?.metadata?.createdAt;
  const createdDate = createdDateRaw
    ? new Date(parseInt(createdDateRaw)).toLocaleDateString()
    : "Not available";

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/api/topics?email=${user.email}`)
        .then((res) => {
          const allCodes = res.data || [];
          const recent = allCodes.slice(-3).reverse();
          setCodeStats({ total: allCodes.length, recent });
        })
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  const profileItems = [
    {
      title: "Full Name",
      description: user?.displayName || "Not available",
      icon: <User className="w-8 h-8 text-[#9f7aea]" />,
      className: "md:col-span-2",
    },
    {
      title: "Email",
      description: user?.email || "Not available",
      icon: <Mail className="w-8 h-8 text-[#9f7aea]" />,
      className: "md:col-span-1",
    },
    {
      title: "Total Code Entries",
      description: `${codeStats.total} entries`,
      icon: <Code2 className="w-8 h-8 text-[#9f7aea]" />,
      className: "md:col-span-1",
    },
    {
      title: "Joined",
      description: createdDate || "Not available",

      icon: <Calendar className="w-8 h-8 text-[#9f7aea]" />,
      className: "md:col-span-1",
    },
    {
      title: "Recently Added Code",
      description: codeStats.recent[0]?.title || "Not available",
      icon: <Code2 className="w-8 h-8 text-[#9f7aea]" />,
      className: "md:col-span-1",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#1a132d]">
      <header className="p-5 lg:sticky lg:top-0 lg:z-50">
        <Navbar />
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="relative flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#6b46c1] via-purple-600 to-indigo-700 p-1 shadow-xl">
              <img
                src={user?.photoURL || <User size={40}></User>}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#6b46c1] to-[#b794f4] rounded-full p-2 shadow-lg animate-pulse" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#6b46c1] via-purple-400 to-indigo-300 truncate">
              {user?.displayName || "User"}
            </h1>
            <p className="mt-2 text-xl text-[#b794f4] font-semibold tracking-wide">
              WELCOME TO CODE DIARY
            </p>
            <p className="mt-1 max-w-md text-gray-300 mx-auto md:mx-0">
              Feel Free To Check Your Stats Any Time
            </p>
          </div>
        </div>

        {/* Mobile version: 2-column grid with smaller cards */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {profileItems.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#2d1b4c] via-[#1f1638] to-[#140d26] text-white shadow-lg rounded-xl p-3 flex items-center gap-3 min-h-[5.5rem]"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#6b46c1] via-purple-600 to-indigo-700 shadow-lg flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
                <p className="text-purple-300 font-medium truncate max-w-[90px] text-xs">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
          <div className="col-span-2 text-white bg-gradient-to-br from-[#2d1b4c] via-[#1f1638] to-[#140d26] shadow-lg rounded-xl flex items-center justify-center p-4 min-h-[5.5rem]">
            <TextType
              text={["EAT", "SLEEP", "CODE", "REPEAT"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-5xl text-center text-[#b794f4]"
            />
          </div>
        </div>

        {/* Desktop version: your original BentoGrid - hide on mobile */}
        <BentoGrid className="hidden sm:grid auto-rows-[7rem] md:auto-rows-[10rem] gap-6">
          {profileItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={<h3 className="font-bold text-white">{item.title}</h3>}
              description={
                <p className="text-lg text-purple-300 font-medium">
                  {item.description}
                </p>
              }
              header={
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#6b46c1] via-purple-600 to-indigo-700 shadow-lg">
                  {item.icon}
                </div>
              }
              className={`bg-gradient-to-br from-[#2d1b4c] via-[#1f1638] to-[#140d26] text-white shadow-lg rounded-xl ${item.className}`}
            />
          ))}
          <div className="text-white col-span-3 bg-gradient-to-br from-[#2d1b4c] via-[#1f1638] to-[#140d26] shadow-lg rounded-xl flex items-center justify-center p-4">
            <TextType
              text={["EAT", "SLEEP", "CODE", "REPEAT"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-[82.4px] text-center text-[#b794f4]"
            />
          </div>
        </BentoGrid>
      </main>
    </div>
  );
}

export default UserProfileBentoGrid;
