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

  @media (max-width: 768px) {
    margin: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm};
  }
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
    <Title>{movie.title}</Title>
    <Info>Director: {movie.director}</Info>
    <Info>Genre: {movie.genre}</Info>
    <Info>Actors: {movie.actors}</Info>
    <DetailsLink to={`/movie/${movie.id}`}>Details</DetailsLink>
  </Card>
);

export default MovieCard;
