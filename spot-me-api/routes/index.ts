// const express = require('express');
import express from 'express';
import apiRouter from './api'
import expressAsyncHandler from 'express-async-handler';
import db from '../db/models';

const router = express.Router();

router.get('/', expressAsyncHandler(async (req, res) => {
    //@ts-ignore
    res.cookie('XSRF-TOKEN', req.csrfToken());
    const users = await db.User.findAll();
    console.log(users);
    res.json(users);
}));

router.use('/api', apiRouter);

export default router;
