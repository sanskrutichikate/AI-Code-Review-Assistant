import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

  }, [navigate]);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-300">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-8">

          {/* <h1 className="text-4xl font-bold mb-3">
            Dashboard
          </h1> */}
          <div className="flex justify-between  items-center gap-8">
        <span className=" text-4xl font-bold">
          Welcome, {user?.name}😊
        </span>
         </div>

          <p className="text-gray-600 mb-8">
            Welcome to AI Code Review Assistant
          </p>

          <p className="text-2xl font-semibold">
            Paste your code or upload file & get perfect 
            review by AI 
          </p>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">

              <h2 className="text-2xl font-semibold">
                Paste Code
              </h2>

              <p className="text-gray-500 mt-2">
                Paste source code for AI review.
              </p>

            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">

              <h2 className="text-2xl font-semibold">
                Upload File
              </h2>

              <p className="text-gray-500 mt-2">
                Upload source code files.
              </p>

            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">

              <h2 className="text-2xl font-semibold">
                Review History
              </h2>

              <p className="text-gray-500 mt-2">
                View all previous reviews.
              </p>

            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">

              <h2 className="text-2xl font-semibold">
                Profile
              </h2>

              <p className="text-gray-500 mt-2">
                Manage your account.
              </p>

            </div>

          </div> */}

        </main>

      </div>

    </div>
  );
}

export default Dashboard;