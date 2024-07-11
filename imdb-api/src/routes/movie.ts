import { Router } from 'express';
import { addMovie, voteMovie, listMovies, getMovieDetails } from '../controllers/movieController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/add', authMiddleware, addMovie);
router.post('/vote/:id', authMiddleware, voteMovie);
router.get('/', authMiddleware, listMovies); 
router.get('/:id', authMiddleware, getMovieDetails); 

export default router;
