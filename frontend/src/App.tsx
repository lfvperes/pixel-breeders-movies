import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { RatedMoviesPage } from "./pages/RatedMoviesPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rated" element={<RatedMoviesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;