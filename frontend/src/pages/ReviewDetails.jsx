import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ReviewDetails() {

    const { id } = useParams();

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReview();
    }, []);

    const fetchReview = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:5000/api/reviews/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setReview(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return <h2 className="text-center mt-10">Loading...</h2>;
    }

    if (!review) {
        return <h2 className="text-center mt-10">Review Not Found</h2>;
    }

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <Link
                        to="/reviews"
                        className="text-blue-600 underline"
                    >
                        ← Back to Review History
                    </Link>

                    <h1 className="text-4xl font-bold mt-4 mb-6">
                        {review.title}
                    </h1>

                    <div className="bg-white shadow rounded p-6">

                        <p>
                            <strong>Language:</strong> {review.language}
                        </p>

                        <p className="mt-2">
                            <strong>Created:</strong>{" "}
                            {new Date(review.created_at).toLocaleString()}
                        </p>

                    </div>

                    {/* Source Code */}

                    <div className="bg-white shadow rounded p-6 mt-6">

                        <h2 className="text-2xl font-bold mb-4">
                            Source Code
                        </h2>

                        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto">
                            <code>
                                {review.source_code}
                            </code>
                        </pre>

                    </div>

                    {/* Complexity */}

                    <div className="bg-white shadow rounded p-6 mt-6">

                        <h2 className="text-2xl font-bold mb-4">
                            Complexity Analysis
                        </h2>

                        <pre>
                            {JSON.stringify(review.complexity, null, 2)}
                        </pre>

                    </div>

                    {/* Code Smells */}

                    <div className="bg-white shadow rounded p-6 mt-6">

                        <h2 className="text-2xl font-bold mb-4">
                            Code Smells
                        </h2>

                        <pre>
                            {JSON.stringify(review.code_smells, null, 2)}
                        </pre>

                    </div>

                    {/* Documentation */}

                    <div className="bg-white shadow rounded p-6 mt-6">

                        <h2 className="text-2xl font-bold mb-4">
                            Documentation
                        </h2>

                        <pre>
                            {JSON.stringify(review.documentation, null, 2)}
                        </pre>

                    </div>

                </main>

            </div>

        </div>

    );

}

export default ReviewDetails;