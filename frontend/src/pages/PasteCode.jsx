import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function PasteCode() {

    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("JavaScript");
    const [sourceCode, setSourceCode] = useState("");

    const [findings, setFindings] = useState([]);
    const [aiReview, setAiReview] = useState(null);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // New States
    const [complexity, setComplexity] = useState(null);
    const [codeSmells, setCodeSmells] = useState([]);
    const [documentation, setDocumentation] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        if (!title || !language || !sourceCode) {
            setMessage("Please fill all fields.");
            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            // Static Analysis API
            const response = await axios.post(
                "http://localhost:5000/api/code",
                {
                    title,
                    language,
                    sourceCode,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFindings(response.data.findings || []);
            setMessage(response.data.message || "");
            setComplexity(response.data.complexity || null);
            setCodeSmells(response.data.codeSmells || []);
            setDocumentation(response.data.documentation);

            // AI Review API
            const aiResponse = await axios.post(
                "http://localhost:5000/api/ai/review",
                {
                    sourceCode,
                    language,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("AI REVIEW RESPONSE:", aiResponse.data.review);

            setAiReview(aiResponse.data.review);

            // Clear Form
            setTitle("");
            setLanguage("JavaScript");
            setSourceCode("");

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <h1 className="text-4xl font-bold mb-2">
                        Paste Code
                    </h1>

                    <p className="text-gray-600 mb-8">
                        Paste your code below for AI analysis.
                    </p>

                    <div className="bg-white shadow-lg rounded-lg p-8">

                        {message && (
                            <div className="mb-5 bg-blue-100 text-blue-700 p-3 rounded">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Title */}

                            <label className="block font-semibold mb-2">
                                Title
                            </label>

                            <input
                                type="text"
                                placeholder="Enter snippet title"
                                className="w-full border rounded p-3 mb-6"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />


                            {/* Language */}

                            <label className="block font-semibold mb-2">
                                Programming Language
                            </label>

                            <select
                                className="w-full border rounded p-3 mb-6"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >

                                <option>JavaScript</option>
                                <option>Java</option>
                                <option>Python</option>
                                <option>C</option>
                                <option>C++</option>

                            </select>


                            {/* Source Code */}

                            <label className="block font-semibold mb-2">
                                Source Code
                            </label>

                            <textarea
                                rows="15"
                                placeholder="Paste your code here..."
                                className="w-full border rounded p-3 mb-6 font-mono"
                                value={sourceCode}
                                onChange={(e) => setSourceCode(e.target.value)}
                            />


                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded disabled:bg-gray-400"
                            >

                                {loading ? "Analyzing..." : "Submit Code"}

                            </button>

                        </form>
                        {/* Static Analysis Results */}

                        {findings.length > 0 && (
                            <div className="mt-8 bg-gray-50 rounded-lg shadow p-6">

                                <h2 className="text-2xl font-bold mb-4">
                                    🔍 Static Analysis Results
                                </h2>

                                {findings.map((item, index) => (

                                    <div
                                        key={index}
                                        className="border rounded-lg p-4 mb-4 bg-white"
                                    >

                                        <p>
                                            <strong>Severity:</strong> {item.severity}
                                        </p>

                                        <p>
                                            <strong>Rule:</strong> {item.rule}
                                        </p>

                                        <p>
                                            <strong>Message:</strong> {item.message}
                                        </p>

                                        <p>
                                            <strong>Line:</strong> {item.line}
                                        </p>

                                        <p>
                                            <strong>Column:</strong> {item.column}
                                        </p>

                                    </div>

                                ))}

                            </div>
                        )}


                        {/* AI Review */}

                        {aiReview && (

                            <div className="mt-8 bg-gray-50 shadow rounded-lg p-6">

                                <h2 className="text-2xl font-bold mb-4">
                                    🤖 AI Code Review
                                </h2>

                                <h3 className="font-bold">Summary</h3>
                                <p className="mb-5">{aiReview.summary}</p>

                                <h3 className="font-bold mt-5"> Bugs</h3>

                                <ul className="list-disc ml-6">
                                    {aiReview.bugs?.length > 0 ? (
                                        aiReview.bugs.map((bug, index) => (
                                            <li key={index}>{bug}</li>
                                        ))
                                    ) : (
                                        <li>No bugs found.</li>
                                    )}
                                </ul>

                                <h3 className="font-bold mt-5"> Improvements</h3>

                                <ul className="list-disc ml-6">
                                    {aiReview.improvements?.length > 0 ? (
                                        aiReview.improvements.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))
                                    ) : (
                                        <li>No improvements suggested.</li>
                                    )}
                                </ul>

                                <h3 className="font-bold mt-5">Best Practices</h3>

                                <ul className="list-disc ml-6">
                                    {aiReview.bestPractices?.length > 0 ? (
                                        aiReview.bestPractices.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))
                                    ) : (
                                        <li>No suggestions.</li>
                                    )}
                                </ul>

                                <h3 className="font-bold mt-5"> Security</h3>

                                <ul className="list-disc ml-6">
                                    {aiReview.security?.length > 0 ? (
                                        aiReview.security.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))
                                    ) : (
                                        <li>No security issues.</li>
                                    )}
                                </ul>

                                <h3 className="font-bold mt-5"> Performance</h3>

                                <ul className="list-disc ml-6">
                                    {aiReview.performance?.length > 0 ? (
                                        aiReview.performance.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))
                                    ) : (
                                        <li>No performance suggestions.</li>
                                    )}
                                </ul>

                            </div>

                        )}


                        {/* Complexity Analysis */}

                        {complexity && (

                            <div className="mt-8 bg-blue-50 shadow rounded-lg p-6">

                                <h2 className="text-2xl font-bold mb-4">
                                    Complexity Analysis
                                </h2>

                                <div className="space-y-2">

                                    <p>
                                        <strong>Lines of Code:</strong> {complexity.linesOfCode}
                                    </p>

                                    <p>
                                        <strong>Functions:</strong> {complexity.functions}
                                    </p>

                                    <p>
                                        <strong>Classes:</strong> {complexity.classes}
                                    </p>

                                    <p>
                                        <strong>Cyclomatic Complexity:</strong> {complexity.cyclomaticComplexity}
                                    </p>

                                    <p>
                                        <strong>Complexity Level:</strong> {complexity.complexityLevel}
                                    </p>

                                </div>

                            </div>

                        )}


                        {/* Code Smells */}

                        {complexity && (

                            <div className="mt-8 bg-yellow-50 shadow rounded-lg p-6">

                                <h2 className="text-2xl font-bold mb-4">
                                    Code Smells
                                </h2>

                                {codeSmells.length === 0 ? (

                                    <p className="text-green-600 font-medium">
                                        No code smells detected.
                                    </p>

                                ) : (

                                    codeSmells.map((smell, index) => (

                                        <div
                                            key={index}
                                            className="border rounded-lg p-4 mb-3 bg-white"
                                        >

                                            <h4 className="font-bold text-red-600">
                                                {smell.type}
                                            </h4>

                                            <p>{smell.message}</p>

                                        </div>

                                    ))

                                )}

                            </div>

                        )}


                        {
                            documentation && (

                                <div className="mt-8 bg-white shadow rounded-lg p-6">

                                    <h2 className="text-2xl font-bold mb-4">
                                        📄 Generated Documentation
                                    </h2>

                                    <h3 className="font-bold">
                                        Functions
                                    </h3>

                                    {
                                        documentation.functions.length === 0 ?

                                            <p>No functions found.</p>

                                            :

                                            documentation.functions.map(
                                                (func, index) => (

                                                    <div
                                                        key={index}
                                                        className="mb-4 border-b pb-2"
                                                    >

                                                        <p>
                                                            <strong>Name:</strong>
                                                            {func.name}
                                                        </p>

                                                        <p>
                                                            <strong>Parameters:</strong>
                                                            {func.parameters.join(", ")}
                                                        </p>

                                                    </div>

                                                ))
                                    }

                                    <h3 className="font-bold mt-5">
                                        Classes
                                    </h3>

                                    {
                                        documentation.classes.length === 0 ?

                                            <p>No classes found.</p>

                                            :

                                            documentation.classes.map(
                                                (cls, index) => (

                                                    <div
                                                        key={index}
                                                        className="mb-4 border-b pb-2"
                                                    >

                                                        <p>
                                                            <strong>Class:</strong>
                                                            {cls.name}
                                                        </p>

                                                        <p>
                                                            <strong>Methods:</strong>
                                                        </p>

                                                        <ul className="list-disc ml-6">

                                                            {
                                                                cls.methods.map(
                                                                    (method, i) => (

                                                                        <li key={i}>

                                                                            {method.name}
                                                                            (
                                                                            {method.parameters.join(", ")}
                                                                            )

                                                                        </li>

                                                                    ))
                                                            }

                                                        </ul>

                                                    </div>

                                                ))
                                    }

                                    <h3 className="font-bold mt-5">
                                        API Routes
                                    </h3>

                                    {
                                        documentation.apis.length === 0 ?

                                            <p>No APIs found.</p>

                                            :

                                            documentation.apis.map(
                                                (api, index) => (

                                                    <p key={index}>

                                                        {api.method}
                                                        {" "}
                                                        {api.route}

                                                    </p>

                                                ))
                                    }

                                </div>

                            )
                        }

                    </div>

                </main>

            </div>

        </div>

    );

}

export default PasteCode;