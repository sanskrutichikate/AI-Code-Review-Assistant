import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AnalysisCard from "../components/AnalysisCard";

function AnalysisDashboard() {

    const [results, setResults] = useState([]);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");

    useEffect(() => {

        const fetchResults = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/analysis",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setResults(response.data);

            } catch (error) {

                setMessage(
                    error.response?.data?.message ||
                    "Unable to fetch analysis results."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchResults();

    }, []);


    const filteredResults = results.filter((result) => {

        const matchesSearch = result.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" ||
            result.severity === filter;

        return matchesSearch && matchesFilter;

    });

    return (

        <div className="min-h-screen bg-gray-300">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <h1 className="text-4xl font-bold mb-2">
                        Static Analysis Dashboard
                    </h1>

                    <p className="text-gray-600 mb-8">
                        View all static code analysis results.
                    </p>

                    <div className="mb-6">

                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border rounded-lg p-3 shadow-sm"
                        />

                    </div>

                    <div className="flex gap-4 mb-8">

                        <button
                            onClick={() => setFilter("All")}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            All
                        </button>

                        <button
                            onClick={() => setFilter("Error")}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Errors
                        </button>

                        <button
                            onClick={() => setFilter("Warning")}
                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                            Warnings
                        </button>

                    </div>

                    {loading && (

                        <p>Loading...</p>

                    )}

                    {message && (

                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">

                            {message}

                        </div>

                    )}

                    {!loading && filteredResults.length  === 0 && (

                        <div className="bg-white p-6 rounded shadow">

                            No analysis results found.

                        </div>

                    )}

                    {results.length > 0 && (

                        <div className="mt-8">

                            {filteredResults.map((result) => (

                                <AnalysisCard

                                    key={result.id}

                                    result={result}

                                />

                            ))}

                        </div>

                    )}

                </main>

            </div>

        </div>

    );

}

export default AnalysisDashboard;