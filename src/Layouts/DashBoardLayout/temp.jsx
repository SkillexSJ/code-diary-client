import React, { useContext, useState } from "react";
import Navbar from "../../Components/DaisyUI/Navbar";
import Editor from "@monaco-editor/react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Provider/AuthContext";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Add states for required fields
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("cpp"); // Use language codes for Monaco Editor
  const [approach, setApproach] = useState("");
  const [tagsInput, setTagsInput] = useState(""); // raw comma-separated string for tags
  const [problemLink, setProblemLink] = useState("");
  const [code, setCode] = useState("// Start coding here...");

  // Handle Save — prepare data matching your schema
  const handleSave = () => {
    // Prepare tags array by splitting and trimming
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
      Author: user.displayName || "NULL",
      title,
      topic,
      code,
      language: languageMap[language] || "C++", // Map editor code to full language name if you want
      tags,
      approach,
      problem_link: problemLink,
    };

    console.log("Data to save:", dataToSave);

    // Here you can call your axiosSecure.post
    axiosSecure.post("/api/codes", dataToSave).then((res) => {
      alert("Code saved successfully!");
    });
  };

  // Language code to display name (for backend)
  const languageMap = {
    cpp: "C++",
    c: "C",
    java: "Java",
    python: "Python",
    javascript: "JavaScript",
  };

  return (
    <>
      {/* Navbar with glossy background */}
      <header className="p-5 lg:sticky lg:top-0 z-50 ">
        <Navbar />
      </header>

      <section className="min-h-screen px-4 py-10">
        <h1 className="text-4xl font-extrabold text-center text-white mb-10">
          🧠 Dashboard Workspace
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Info */}
            <Card title="👤 User Info">
              <p>
                <strong>Name:</strong> {user.displayName || user.email}
              </p>
              <p>
                <strong>Codes Stored:</strong> 24
              </p>
              <p>
                <strong>Preferred Language:</strong> C++
              </p>
            </Card>

            {/* Quick Widget */}
            <Card title="📌 Quick Widget">
              <p>
                ⭐ Streak: <strong>12 days</strong>
              </p>
              <p>
                🕓 Last Added: <strong>1 day ago</strong>
              </p>
              <p>
                🔄 Most Used: <strong>Python</strong>
              </p>
            </Card>

            {/* Inputs */}
            <Card title="📝 New Code Entry" className="md:col-span-2 space-y-4">
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

          {/* Code Editor */}
          <Card title="💻 Code Editor" className="flex flex-col">
            <div className="flex-1">
              <Editor
                height="400px"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value ?? "")}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  automaticLayout: true,
                }}
              />
            </div>
            <div className="text-right mt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#6B46C1] text-white hover:bg-[#8e126e] font-semibold rounded-full transition"
              >
                💾 Save Code
              </button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

// Reusable Card component (no changes)
const Card = ({ title, children, className = "" }) => (
  <div
    className={`bg-[#1a1a1a]/60 backdrop-blur-md border border-[#6B46C1]/30 rounded-2xl shadow-lg p-6 ${className}`}
  >
    <h2 className="text-xl font-bold text-[#6B46C1] mb-4">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

export default DashBoardLayout;
