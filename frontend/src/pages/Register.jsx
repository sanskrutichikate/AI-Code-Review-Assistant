import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword

        ) {
            setError("Please fill all fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }


        try {
            setLoading(true);

            const response = await api.post("/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            setSuccess(response.data.message);

            // Clear Form
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            // Go to Login after 2 seconds
            setTimeout(() => {
                navigate("/");
            }, 2000);

        }

        catch (err) {
            setError(
                err.response?.data?.message || "Registration Failed"
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-blue-900 flex items-center justify-center">

            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-6">
                    AI Code Review Assistant
                </h1>

                <h2 className="text-xl text-center mb-6">
                    Register
                </h2>

                {error && (
                    <p className="bg-red-100 text-red-700 p-2 rounded mb-4">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="bg-green-100 text-green-700 p-2 rounded mb-4">
                        {success}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-400 hover:bg-yellow-600 text-white py-3 rounded"
                    >
                        {loading ? "Registering..." : "Register 🚀"}
                    </button>

                </form>

                <p className="text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-blue-600 font-semibold"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;