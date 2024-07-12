import React from 'react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    director: string;
    genre: string;
    actors: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <div className="movie-card">
    <h3>{movie.title}</h3>
    <p>Director: {movie.director}</p>
    <p>Genre: {movie.genre}</p>
    <p>Actors: {movie.actors}</p>
    <Link to={`/movie/${movie.id}`}>Details</Link>
  </div>
);

export default MovieCard;
