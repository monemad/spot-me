import express from 'express';
import sessionRouter from './session';
import usersRouter from './users';

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

export default router;
