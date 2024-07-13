import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';
import styled from 'styled-components';
import { showErrorToast } from '../utils/toast';

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
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
      }
      
      try {
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Falha ao buscar detalhes do filme', error);
        showErrorToast('Falha ao buscar detalhes do filme');
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {movie.image && <Image src={`http://localhost:3001/${movie.image}`} alt={movie.title} />}
      <Title>{movie.title}</Title>
      <Info>Diretor: {movie.director}</Info>
      <Info>Gênero: {movie.genre}</Info>
      <Info>Atores: {movie.actors}</Info>
      <Info>Nota Média: {movie.averageVote}</Info>
    </Container>
  );
};

export default MovieDetail;
