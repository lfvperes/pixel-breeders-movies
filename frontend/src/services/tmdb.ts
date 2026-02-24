import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "en-US",
  },
});

export const searchMovies = (query: string, page = 1) =>
  tmdb.get<{ results: Movie[]; total_pages: number }>("/search/movie", {
    params: { query, page },
  });

export const getMovieDetail = (id: number) =>
  tmdb.get<MovieDetail>(`/movie/${id}`, {
    params: { append_to_response: "credits" },
  });

import { Movie, MovieDetail } from "../types";