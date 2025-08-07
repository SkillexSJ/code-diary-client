import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Code2, Folder } from "lucide-react";
import { motion } from "framer-motion";
import { GlowingEffect } from "../../Components/Ui/GlowingEffect";
import { PointerHighlight } from "../../Components/Ui/PointerHighlight";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const TopicList = () => {
  const { topicName } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const {
    data: codes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["codes", user?.email, topicName],
    enabled: !!topicName,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/topics/codes?email=${encodeURIComponent(
          user.email
        )}&topic=${encodeURIComponent(topicName)}`
      );
      return data;
    },
  });

  const filteredCodes = codes.filter((code) =>
    code.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.section
      className="px-4 py-16 max-w-6xl mx-auto font-nunito"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.h1
        className="text-center text-4xl md:text-5xl font-extrabold text-white mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Folder className="inline-block -translate-y-1 mr-2" size={40} />
        {/* <span className="text-[#6B46C1]">{topicName}</span> */}
        <PointerHighlight
          rectangleClassName="bg-neutral-200  dark:border-neutral-600 leading-loose"
          pointerClassName=" h-3 w-3"
          containerClassName="inline-block mr-1"
        >
          <span className="relative z-10 tracking-wider text-[#6B46C1]">
            {topicName}
          </span>
        </PointerHighlight>
      </motion.h1>

      {/* Search Bar */}
      <motion.div
        className="mb-10 flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Search your codes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
        />
      </motion.div>

      {/* Grid of Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {filteredCodes.map((code, idx) => (
          <motion.div
            key={code._id}
            variants={cardVariants}
            className="bg-gradient-to-br from-[#1C1B2A] to-[#2A1B3D] p-6 rounded-xl shadow-lg relative overflow-hidden"
          >
            {/* BG Icon */}
            <Code2 className="absolute -top-8 -right-8 text-white/10 w-32 h-32 rotate-[20deg]" />

            <h2 className="text-xl font-semibold text-white mb-2">
              {code.title}
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Created: {new Date(code.createdAt).toDateString()}
            </p>

            <Link
              to={`/topics/${topicName}/${code._id}`}
              className="inline-block mt-auto px-4 py-2 rounded-full text-sm font-medium text-white bg-[#6B46C1] hover:bg-[#5a3bb0] transition"
            >
              View Code
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* No Code Message */}
      {filteredCodes.length === 0 && (
        <motion.p
          className="text-center text-gray-400 mt-10 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No code found for this topic.
        </motion.p>
      )}
    </motion.section>
  );
};

export default TopicList;
