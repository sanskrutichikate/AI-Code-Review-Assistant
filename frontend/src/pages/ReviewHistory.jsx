import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ReviewHistory() {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/reviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const filteredReviews = reviews.filter((review) =>
    review.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/reviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review deleted successfully!");

      // Refresh list
      fetchReviews();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Delete failed."
      );

    }

  };

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-8">

          <h1 className="text-4xl font-bold mb-6">
            Review History
          </h1>

          {/* Search Box */}

          <div className="mb-6">

            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 border rounded-lg p-3"
            />

          </div>

          {

            loading ?

              <h2>Loading...</h2>

              :

              <table className="w-full bg-white shadow rounded">

                <thead>

                  <tr className="bg-gray-200">

                    <th className="p-3">Title</th>

                    <th className="p-3">Language</th>

                    <th className="p-3">Date</th>

                    <th className="p-3">Action</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    filteredReviews.length === 0 ?

                      <tr>

                        <td
                          colSpan="4"
                          className="text-center p-5"
                        >
                          No Reviews Found
                        </td>

                      </tr>

                      :

                      filteredReviews.map((review) => (

                        <tr
                          key={review.id}
                          className="border-b"
                        >

                          <td className="p-3">
                            {review.title}
                          </td>

                          <td className="p-3">
                            {review.language}
                          </td>

                          <td className="p-3">
                            {new Date(
                              review.created_at
                            ).toLocaleString()}
                          </td>

                          <td className="p-3 flex gap-2">

                            <button
                              onClick={() => navigate(`/reviews/${review.id}`)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                              View
                            </button>

                            <button
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                              onClick={() => handleDelete(review.id)}
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))

                  }

                </tbody>

              </table>

          }

        </main>

      </div>

    </div>

  );

}

export default ReviewHistory;