import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    director: string;
    genre: string;
    actors: string;
    image: string;
  };
}

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md};
  text-align: left;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const Image = styled.img`
  width: 150px;
  height: 225px;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-right: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-right: 0;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

const Info = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const DetailsLink = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <Card>
    {movie.image && <Image src={`http://localhost:3001/${movie.image}`} alt={movie.title} />}
    <InfoContainer>
      <Title>{movie.title}</Title>
      <Info>Diretor: {movie.director}</Info>
      <Info>Gênero: {movie.genre}</Info>
      <Info>Atores: {movie.actors}</Info>
      <DetailsLink to={`/movie/${movie.id}`}>Detalhes</DetailsLink>
    </InfoContainer>
  </Card>
);

export default MovieCard;