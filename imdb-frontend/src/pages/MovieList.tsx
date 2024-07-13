import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MovieCard from '../components/MovieCard';
import styled from 'styled-components';

interface Movie {
  id: number;
  title: string;
  director: string;
  genre: string;
  actors: string;
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Container>
      <Title>Movie List</Title>
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    </Container>
  );
};

export default MovieList;
