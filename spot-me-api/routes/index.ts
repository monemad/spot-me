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
    const user = await db.User.build({firstName: 'Wiz', lastName: 'Kika', username: 'wizkika', email: 'therealwizkika@gmail.com', hashedPassword: 'testhashpassword', imgUrl: 'testImgUrl', balance: 999.99})
    await user.save();
    console.log(user);
    res.json(users);
}));


export default router;
