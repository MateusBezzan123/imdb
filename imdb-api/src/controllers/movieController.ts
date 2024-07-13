import { Request, Response } from 'express';
import prisma from '../models/prismaClient';
import handleValidationErrors from '../utils/handleValidationErrors';

export const addMovie = async (req: Request, res: Response) => {
  handleValidationErrors(req, res);

  const { title, director, genre, actors } = req.body;
  const { user } = req as any;
  const image = req.file ? `uploads/${req.file.filename}` : null;

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can add movies' });
  }

  try {
    const newMovie = await prisma.movie.create({
      data: { title, director, genre, actors, image },
    });

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie', error: (error as Error).message });
  }
};
export const voteMovie = async (req: Request, res: Response) => {
  handleValidationErrors(req, res);

  const { id } = req.params;
  const { value } = req.body;
  const { user } = req as any;

  if (user.role !== 'user') {
    return res.status(403).json({ message: 'Only users can vote' });
  }

  try {
    const vote = await prisma.vote.create({
      data: { value, userId: user.id, movieId: Number(id) },
    });

    res.status(201).json(vote);
  } catch (error) {
    res.status(500).json({ message: 'Error voting', error: (error as Error).message });
  }
};

export const listMovies = async (req: Request, res: Response) => {
  const { director, title, genre, actors } = req.query;

  try {
    const movies = await prisma.movie.findMany({
      where: {
        director: director ? String(director) : undefined,
        title: title ? String(title) : undefined,
        genre: genre ? String(genre) : undefined,
        actors: actors ? String(actors) : undefined,
      },
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error listing movies', error: (error as Error).message });
  }
};

export const getMovieDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const movie = await prisma.movie.findUnique({
      where: { id: Number(id) },
      include: { votes: true },
    });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const averageVote = movie.votes.reduce((acc, vote) => acc + vote.value, 0) / movie.votes.length;

    res.json({ ...movie, averageVote });
  } catch (error) {
    res.status(500).json({ message: 'Error getting movie details', error: (error as Error).message });
  }
};
