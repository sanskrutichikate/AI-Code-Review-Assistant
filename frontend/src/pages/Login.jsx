import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();
    //form data
    const [formData, setFormData] = useState({
        email: "",
        password: "",

    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };
    //handel login
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        //validation

        if (!formData.email || !formData.password) {
            setError("Please fill all fields.");
            return;
        }
        try {
            setLoading(true);

            const response = await api.post("/auth/login", {
                email: formData.email,
                password: formData.password,
            });
            localStorage.setItem("token", response.data.token);

            // Store User
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            // Go to Dashboard
            navigate("/dashboard");

        } catch (err) {
            setError(
                err.response?.data?.message || "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center px-6">

        <div className="max-w-6xl w-full flex items-center justify-between gap-12">

            {/* Left Side */}
            <div className="flex-1 text-white">

                <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                    AI Code Review
                    <br />
                    Assistant
                </h1>

                <p className="text-lg text-blue-100 mb-8">
                    Analyze your code with AI Code Review Assistant &
                    Improve your code quality...
                </p>

                <div className="space-y-4">

                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🤖</span>
                        <p>AI Code Review</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🐞</span>
                        <p>Bug Detection & Suggestions</p>
                    </div>

                    

                    <div className="flex items-center gap-3">
                        <span className="text-2xl">📈</span>
                        <p>Complexity & Performance Reports</p>
                    </div>

                </div>

            </div>

            {/* Right Side */}
            <div className="flex-1 flex justify-center">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

                    <h2 className="text-3xl font-bold text-center mb-2">
                        Welcome Back
                    </h2>

                   

                    {error && (
                        <p className="bg-red-100 text-red-700 p-3 rounded mb-4">
                            {error}
                        </p>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                        >
                            {loading ? "Logging In..." : "Login 🚀"}
                        </button>

                    </form>

                    <p className="text-center mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Register
                        </Link>
                    </p>

                </div>

            </div>

        </div>

    </div>
);
}

export default Login;

