import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import api from '../services/api';
import styled from 'styled-components';

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

const DropzoneContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.darkGray};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  cursor: pointer;
`;

const AddMovie: React.FC = () => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [actors, setActors] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('director', director);
    formData.append('genre', genre);
    formData.append('actors', actors);
    if (file) {
      formData.append('image', file);
    }

    try {
      await api.post('/movies/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/movies');
    } catch (error) {
      console.error('Failed to add movie', error);
    }
  };

  return (
    <Container>
      <Title>Adicionar Filme</Title>
      <Form onSubmit={handleAddMovie}>
        <FormGroup>
          <Label>Título</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Diretor</Label>
          <Input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Gênero</Label>
          <Input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Atores</Label>
          <Input
            type="text"
            value={actors}
            onChange={(e) => setActors(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Imagem</Label>
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            {file ? <p>{file.name}</p> : <p>Arraste uma imagem ou clique para selecionar</p>}
          </DropzoneContainer>
        </FormGroup>
        <Button type="submit">Adicionar Filme</Button>
      </Form>
    </Container>
  );
};

export default AddMovie;
