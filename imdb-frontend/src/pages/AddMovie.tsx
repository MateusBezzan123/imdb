import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const AddMovie: React.FC = () => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [actors, setActors] = useState('');
  const navigate = useNavigate();

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/movies/add', { title, director, genre, actors });
      navigate('/movies');
    } catch (error) {
      console.error('Failed to add movie', error);
    }
  };

  return (
    <Container>
      <Title>Add Movie</Title>
      <Form onSubmit={handleAddMovie}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Director</Label>
          <Input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Genre</Label>
          <Input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Actors</Label>
          <Input
            type="text"
            value={actors}
            onChange={(e) => setActors(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Add Movie</Button>
      </Form>
    </Container>
  );
};

export default AddMovie;
