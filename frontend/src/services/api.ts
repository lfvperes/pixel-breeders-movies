import axios from "axios";
import type { Rating } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000",
});

export const getRating = (movieId: number) =>
  api.get<Rating>(`/ratings/${movieId}`);

export const getAllRatings = () =>
  api.get<Rating[]>("/ratings/");

export const createRating = (data: {
  movie_id: number;
  title: string;
  poster_path: string | null;
  rating: number;
}) => api.post<Rating>("/ratings/", data);

export const updateRating = (movieId: number, rating: number) =>
  api.put<Rating>(`/ratings/${movieId}`, { rating });

export const deleteRating = (movieId: number) =>
  api.delete(`/ratings/${movieId}`);