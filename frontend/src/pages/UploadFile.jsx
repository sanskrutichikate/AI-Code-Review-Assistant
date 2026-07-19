import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function UploadFile() {

    const [file, setFile] = useState(null);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    // Upload

    const handleUpload = async (e) => {

        e.preventDefault();

        if (!file) {

            setMessage("Please select a file.");

            return;
        }

        try {

            setLoading(true);

            setMessage("");

            const formData = new FormData();

            formData.append("file", file);

            const token = localStorage.getItem("token");

            const response = await axios.post(

                "http://localhost:5000/api/upload",

                formData,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setMessage(response.data.message);

            setFile(null);

        }

        catch (error) {

            setMessage(

                error.response?.data?.message ||

                "File upload failed."

            );

        }

        finally {

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

                        Upload File

                    </h1>

                 

                    <div className="bg-white p-8 rounded-lg shadow">

                        {message && (

                            <div className="mb-5 bg-blue-100 text-blue-700 p-3 rounded">

                                {message}

                            </div>

                        )}

                        <input

                            type="file"

                            accept=".js,.java,.py,.cpp,.c,.cs,.php,.ts"

                            onChange={(e) => setFile(e.target.files[0])}

                            className="mb-5"

                        />

                        {file && (

                            <p className="mb-5">

                                <strong>Selected File:</strong>

                                {" "}

                                {file.name}

                            </p>

                        )}

                        <button

                            onClick={handleUpload}

                            disabled={loading}

                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"

                        >

                            {loading ? "Uploading..." : "Upload File"}

                        </button>

                    </div>

                </main>

            </div>

        </div>

    );

}

export default UploadFile;