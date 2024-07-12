import { Router } from 'express';
import { check } from 'express-validator';
import { addMovie, voteMovie, listMovies, getMovieDetails } from '../controllers/movieController';
import authMiddleware from '../middleware/auth';

const router = Router();

const movieValidations = [
  check('title').notEmpty().withMessage('Title is required'),
  check('director').notEmpty().withMessage('Director is required'),
  check('genre').notEmpty().withMessage('Genre is required'),
  check('actors').notEmpty().withMessage('Actors are required'),
];

const voteValidations = [
  check('value').isInt({ min: 0, max: 4 }).withMessage('Vote value must be between 0 and 4'),
];

router.post('/add', authMiddleware, movieValidations, addMovie);

router.post('/vote/:id', authMiddleware, voteValidations, voteMovie);

router.get('/', authMiddleware, listMovies);
router.get('/:id', authMiddleware, getMovieDetails);

export default router;
