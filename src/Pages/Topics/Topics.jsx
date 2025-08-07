import { Brain } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PointerHighlight } from "../../Components/Ui/PointerHighlight";
import ShiningButton from "../../Components/Ui/Button";
import { motion } from "framer-motion";

const Topics = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const {
    data: topics = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topics", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/topics?email=${encodeURIComponent(user.email)}`
      );
      return data;
    },
  });

  const uniqueTopics = Array.from(
    new Map(topics.map((entry) => [entry.topic, entry])).values()
  );

  const filteredTopics = uniqueTopics.filter((topic) =>
    topic.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-4 min-h-screen py-16 max-w-7xl mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-[82.4px] font-extrabold text-[#6B46C1] mb-4">
          Browse Your{" "}
          <PointerHighlight
            rectangleClassName="bg-neutral-200  dark:border-neutral-600 leading-loose"
            pointerClassName=" h-3 w-3"
            containerClassName="inline-block mr-1"
          >
            <span className="relative z-10">Topics</span>
          </PointerHighlight>{" "}
        </h1>
        <p className="max-w-2xl mx-auto">
          Organize your C++, Python, or JavaScript code by algorithm or concept.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {filteredTopics.map((entry) => (
          <motion.div
            key={entry._id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="cursor-pointer rounded-xl bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] shadow-lg text-white p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <Brain className="w-12 h-12 object-cover rounded-lg" />
              <div>
                <h3 className="text-xl font-bold">{entry.topic}</h3>
                <p className="text-sm text-pink-100">
                  Covers All Topic of {entry.topic}
                </p>
              </div>
            </div>

            <NavLink to={`/topics/${entry.topic}`}>
              <button className="w-[200px] mt-4 py-2 rounded-lg bg-purple-700 text-white font-semibold shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
                Click to view your saved code
              </button>
            </NavLink>
          </motion.div>
        ))}

        {filteredTopics.length === 0 && (
          <div className="flex flex-col col-span-4 gap-5 items-center justify-center">
            <p className=" text-4xl lg:text-[82.9px] ">No topics found.</p>
            <Link to="/dashboard">
              <ShiningButton className="px-6 py-2 text-sm sm:text-base">
                Add Your Code!
              </ShiningButton>
            </Link>
          </div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default Topics;
