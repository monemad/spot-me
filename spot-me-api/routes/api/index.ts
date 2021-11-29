import express from 'express';
import sessionRouter from './session';
import usersRouter from './users';
import friendsRouter from './friends';
import paymentsRouter from './payments';
import transfersRouter from './transfers';

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/friends', friendsRouter);
router.use('/payments', paymentsRouter);
router.use('/transfers', transfersRouter);

export default router;
