import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { ValidationError } from 'sequelize';

import routes from './routes';

const { environment } = require('./config');

const isProduction: boolean = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(helmet({
    contentSecurityPolicy: false
}));

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
        secure: isProduction,
        //@ts-ignore
        sameSite: isProduction && "Lax",
        httpOnly: true,
        },
    })
);

app.use(routes);

// Error handling

class RequestError extends Error {
    title: string;
    errors: Array<string>;
    status: number;

    constructor(error: string) {
        super(error);
        this.title = '';
        this.errors = [];
        this.status = 0;
    }
}

app.use((_req, _res, next) => {
    const err = new RequestError("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

// Process sequelize errors
app.use((err: RequestError | ValidationError, _req: any, _res: any, next: any) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        const newError = new RequestError("Sequelize Validation Error")
        newError.errors = err.errors.map((e) => e.message);
        newError.title = 'Validation error';
        next(newError);
    }
    next(err)
});

app.use((err: RequestError, _req: any, res: any, _next: any) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

export default app;
