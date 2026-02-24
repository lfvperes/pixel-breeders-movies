import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-tight text-white hover:text-yellow-400 transition-colors">
        🎬 MovieSearch
      </Link>
      <div className="flex gap-6 text-sm font-medium">
        <Link
          to="/"
          className={`hover:text-yellow-400 transition-colors ${pathname === "/" ? "text-yellow-400" : "text-gray-300"}`}
        >
          Search
        </Link>
        <Link
          to="/rated"
          className={`hover:text-yellow-400 transition-colors ${pathname === "/rated" ? "text-yellow-400" : "text-gray-300"}`}
        >
          Rated Movies
        </Link>
      </div>
    </nav>
  );
}