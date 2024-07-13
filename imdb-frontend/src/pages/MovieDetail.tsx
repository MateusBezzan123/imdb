import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import styled from 'styled-components';

interface Movie {
  id: number;
  title: string;
  director: string;
  genre: string;
  actors: string;
  averageVote: number;
}

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Info = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>{movie.title}</Title>
      <Info>Director: {movie.director}</Info>
      <Info>Genre: {movie.genre}</Info>
      <Info>Actors: {movie.actors}</Info>
      <Info>Average Vote: {movie.averageVote}</Info>
    </Container>
  );
};

export default MovieDetail;
