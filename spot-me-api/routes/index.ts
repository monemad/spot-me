// const express = require('express');
import express from 'express';
const router = express.Router();

router.get('/hello/world', function(req, res) {
    //@ts-ignore
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

export default router;
