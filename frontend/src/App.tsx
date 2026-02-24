import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rated" element={<div className="text-white p-10">Rated Movies (coming soon)</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;