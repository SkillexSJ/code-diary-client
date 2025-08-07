import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Delete, Save, Share, Code2 } from "lucide-react";
import { GlowingEffect } from "../../Components/Ui/GlowingEffect";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { LoaderOne } from "../../Components/Ui/Loader";

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

const toastOptions = {
  style: {
    borderRadius: "10px",
    background: "white",
    color: "#6b46c1",

    fontWeight: "bold",
  },
  iconTheme: {
    primary: "#6b46c1",
    secondary: "#121212",
  },
};

const Code = () => {
  const { codeId, topicName } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [code, setCode] = useState("");
  const notifySuccess = (msg = "Code saved successfully!") =>
    toast.success(msg, toastOptions);
  const notifyError = (msg = "Failed to save code.") =>
    toast.error(msg, toastOptions);

  const {
    data: codeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["code", codeId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/codes/${codeId}`);
      return res.data;
    },
    enabled: !!codeId,
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedCode) =>
      await axiosSecure.put(`/api/codes/${codeId}`, updatedCode),
    onSuccess: () => {
      notifySuccess();
      queryClient.invalidateQueries(["code", codeId]);
    },
    onError: () => {
      notifyError();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => await axiosSecure.delete(`/api/codes/${codeId}`),
    onSuccess: () => {
      notifySuccess("Code deleted successfully!");

      navigate(`/topics/${topicName}`);
    },
    onError: () => {
      notifyError();
    },
  });

  useEffect(() => {
    if (codeData) {
      setCode(codeData.code);
    }
  }, [codeData]);

  const handleSave = () => {
    updateMutation.mutate({ ...codeData, code });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this code?")) {
      deleteMutation.mutate();
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center h-screen p-10">
        <LoaderOne></LoaderOne>
      </div>
    );
  if (isError)
    return (
      <div className="text-center p-10  font-bold text-red-500">
        Error loading code.
      </div>
    );

  return (
    <motion.section
      className="px-4 py-16 max-w-5xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid gap-6 md:grid-cols-3 grid-cols-1">
        {/* Title Card */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-2 bg-[#6b46c1]/90 p-6 rounded-2xl shadow text-white"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            {codeData.title}
          </h1>
          <p className="text-sm md:text-xl text-purple-200 font-medium">
            Author: {codeData.Author}
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div
          variants={cardVariants}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white"
        >
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <h3 className="text-lg font-bold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {codeData.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#6b46c1] px-3 py-1 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Approach Card */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-1 bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-white"
        >
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <h3 className="text-xl font-semibold mb-2 text-[#dcd1ff]">
            Approach
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            {codeData.approach || "No approach provided by the user."}
          </p>
        </motion.div>

        {/* CodeMirror Editor */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-2 bg-[#1e1b2e] p-4 rounded-2xl shadow overflow-hidden flex flex-col"
        >
          <CodeMirror
            value={code}
            height="400px"
            theme={oneDark}
            extensions={[cpp()]}
            onChange={(value) => setCode(value)}
          />
          <div className="flex justify-end gap-4 mt-4">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <button className="bg-[#6b46c1] hover:bg-[#8b54d9] text-white px-4 py-2 rounded-lg transition">
              <a
                href={codeData.problem_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Share className="inline-block" /> Problem Link
              </a>
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Delete className="inline-block" /> Delete Code
            </button>
            <button
              onClick={handleSave}
              className="bg-[#6b46c1] hover:bg-[#8b54d9] text-white px-4 py-2 rounded-lg transition"
            >
              <Save className="inline-block" /> Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Code;
