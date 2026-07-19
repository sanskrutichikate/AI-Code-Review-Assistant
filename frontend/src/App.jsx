import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PasteCode from "./pages/PasteCode";
import UploadFile from "./pages/UploadFile";
import ReviewHistory from "./pages/ReviewHistory";

import AnalysisDashboard from "./pages/AnalysisDashboard";
import ReviewDetails from "./pages/ReviewDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/paste-code" element={<PasteCode />} />
        <Route path="/upload-file" element={<UploadFile />} />
        <Route path="/history" element={<ReviewHistory />} />
       
        <Route path="/analysis" element={<AnalysisDashboard />}/>

        <Route path="/reviews/:id"element={<ReviewDetails />}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;