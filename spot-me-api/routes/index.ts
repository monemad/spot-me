// const express = require('express');
import express from 'express';
import apiRouter from './api'
import expressAsyncHandler from 'express-async-handler';
import db from '../db/models';

const router = express.Router();

router.use('/api', apiRouter);

router.get('/', expressAsyncHandler(async (req, res) => {
    //@ts-ignore
    res.cookie('XSRF-TOKEN', req.csrfToken());
    const users = await db.User.findAll();
    res.json(users);
}));


export default router;
