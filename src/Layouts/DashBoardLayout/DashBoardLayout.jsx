import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import Navbar from "../../Components/DaisyUI/Navbar";
import { GlowingEffect } from "../../Components/Ui/GlowingEffect";
import {
  BookOpenCheck,
  Computer,
  PencilIcon,
  SaveIcon,
  Settings,
  User,
} from "lucide-react";
import { PointerHighlight } from "../../Components/Ui/PointerHighlight";
import { motion } from "framer-motion";

// CodeMirror imports
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { autocompletion } from "@codemirror/autocomplete";
import toast, { Toaster } from "react-hot-toast";

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

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [approach, setApproach] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [problemLink, setProblemLink] = useState("");
  const [code, setCode] = useState("// Start coding here...");
  const notifySuccess = (msg = "Code saved successfully!") =>
    toast.success(msg, toastOptions);
  const notifyError = (msg = "Failed to save code.") =>
    toast.error(msg, toastOptions);

  const handleSave = () => {
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (!title || !topic || !code) {
      alert("Please fill in Title, Topic, and Code");
      return;
    }

    const dataToSave = {
      userEmail: user.email,
      title,
      topic,
      code,
      language: languageMap[language] || "C++",
      tags,
      approach,
      problem_link: problemLink,
    };

    axiosSecure
      .post("/api/codes", dataToSave)
      .then((res) => {
        notifySuccess();
        // Clear the form fields
        setTitle("");
        setTopic("");
        setLanguage("cpp");
        setApproach("");
        setTagsInput("");
        setProblemLink("");
        setCode("// Start coding here...");
      })
      .catch(() => {
        notifyError();
      });
  };

  const languageMap = {
    cpp: "C++",
    c: "C",
    java: "Java",
    python: "Python",
    javascript: "JavaScript",
  };

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case "cpp":
      case "c":
        return cpp();
      case "java":
        return java();
      case "python":
        return python();
      case "javascript":
        return javascript();
      default:
        return cpp();
    }
  };

  return (
    <>
      <header className="p-5 lg:sticky lg:top-0 z-50">
        <Navbar />
      </header>
      <Toaster position="top-left" reverseOrder={false} />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="min-h-screen px-4 py-10"
      >
        <div className="flex justify-center gap-5">
          <Settings className="w-12 h-full lg:w-20 lg:h-20" />
          <h1 className="text-4xl md:text-[82.4px] font-extrabold text-white mb-10">
            <PointerHighlight
              rectangleClassName="bg-neutral-200 dark:bg-[#6b46c1] dark:border-neutral-600 leading-loose"
              pointerClassName=" h-3 w-3"
              containerClassName="inline-block mr-1"
            >
              <span className="relative z-10">Dashboard</span>
            </PointerHighlight>
            Workspace
          </h1>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-6">
            <Card
              logo={<PencilIcon color="#6B46C1" size={50} />}
              title="Write Your Logic And Approach"
              className="space-y-4 h-full"
            >
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-[#1e1e1e] border border-[#6B46C1]/40 rounded outline-none text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#6B46C1]"
                required
              />
              <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-3 bg-[#1e1e1e] border border-[#6B46C1]/40 rounded outline-none text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#6B46C1]"
                required
              />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 bg-[#1e1e1e] border border-[#6B46C1]/40 rounded outline-none text-white focus:ring-2 focus:ring-[#6B46C1]"
              >
                <option value="cpp">C++</option>
                <option value="c">C</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
              </select>

              <textarea
                value={approach}
                onChange={(e) => setApproach(e.target.value)}
                placeholder="Explain your code approach..."
                className="w-full min-h-32 p-4 bg-[#1e1e1e] border border-[#6B46C1]/40 rounded outline-none text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#6B46C1]"
              />

              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Add tags, comma separated"
                className="w-full p-3 bg-[#1e1e1e] border border-[#6B46C1]/40 rounded outline-none text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#6B46C1]"
              />

              <input
                type="url"
                value={problemLink}
                onChange={(e) => setProblemLink(e.target.value)}
                placeholder="Add Link of the problem"
                className="w-full p-3 bg-[#1e1e1e] border border-[#6B46C1]/40 rounded outline-none text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#6B46C1]"
              />
            </Card>
          </div>

          {/* Right side - Code Editor */}
          <Card
            logo={<Computer color="#6B46C1" size={50} />}
            title="Code Editor"
            className="flex flex-col h-full"
          >
            <div className="flex-1">
              <CodeMirror
                value={code}
                height="500px"
                theme={oneDark}
                extensions={[getLanguageExtension(language), autocompletion()]}
                onChange={(value) => setCode(value)}
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLine: true,
                }}
                className="rounded-md overflow-hidden"
              />
            </div>
            <div className="text-right mt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#6B46C1] w-full text-xl hover:bg-[#8e126e] font-semibold rounded-full transition"
              >
                <SaveIcon className="inline-block -translate-y-1" size={24} />{" "}
                Save Code
              </button>
            </div>
          </Card>
        </div>
      </motion.section>
    </>
  );
};

const Card = ({ logo, title, children, className = "" }) => (
  <div
    className={`bg-[#1a1a1a]/60 backdrop-blur-md rounded-2xl shadow-lg shadow-[#6B46C1]/30 p-6 ${className}`}
  >
    <GlowingEffect
      spread={40}
      glow={true}
      disabled={false}
      proximity={64}
      inactiveZone={0.01}
    />
    <div>{logo}</div>
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

export default DashBoardLayout;
