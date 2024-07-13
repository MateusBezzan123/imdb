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
  image: string;
}

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Image = styled.img`
  width: 300px;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius};
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
      {movie.image && <Image src={`/${movie.image}`} alt={movie.title} />}
      <Title>{movie.title}</Title>
      <Info>Diretor: {movie.director}</Info>
      <Info>Gênero: {movie.genre}</Info>
      <Info>Atores: {movie.actors}</Info>
      <Info>Nota Média: {movie.averageVote}</Info>
    </Container>
  );
};

export default MovieDetail;
