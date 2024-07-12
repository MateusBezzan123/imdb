import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const handleValidationErrors = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

export default handleValidationErrors;
