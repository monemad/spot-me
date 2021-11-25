// const express = require('express');
import express from 'express';
import apiRouter from './api'

const router = express.Router();

router.get('/', (req, res) => {
    //@ts-ignore
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello, World!');
});

router.use('/api', apiRouter);

export default router;
