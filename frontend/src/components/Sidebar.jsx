import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-5">

      <h2 className="text-2xl font-bold mb-6">
        Navigation
      </h2>

      <nav className="flex flex-col gap-4">

        {/* <NavLink
          to="/dashboard"
          className="p-3 rounded hover:bg-blue-100"
        >
          Dashboard
        </NavLink> */}

        <NavLink
          to="/paste-code"
          className="p-3 font-bold rounded hover:bg-blue-100"
        >
          Paste Code
        </NavLink>

        <NavLink
          to="/upload-file"
          className="p-3  font-bold rounded hover:bg-blue-100"
        >
          Upload File
        </NavLink>

        <NavLink
          to="/history"
          className="p-3  font-bold rounded hover:bg-blue-100"
        >
          Review History
        </NavLink>

        

        <NavLink
    to="/analysis"
    className="block py-2 px-4 font-bold hover:bg-blue-100 rounded"
>
    Analysis Dashboard
</NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;