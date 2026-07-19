import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-blue-900 text-white px-10 py-8 flex justify-between items-center shadow-lg">
      <h1 className="text-3xl font-bold">
        AI Code Review Assistant 🤖
      </h1>

      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;