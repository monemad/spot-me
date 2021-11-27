import express from 'express';
import sessionRouter from './session';
import usersRouter from './users';

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

export default router;
