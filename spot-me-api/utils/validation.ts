import { validationResult, check } from "express-validator";
import { RequestError } from "../app";

export const handleValidationErrors = (req: any, _res: any, next: any) => {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => `${error.msg}`);
        const err = new RequestError('Bad request');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request';
        next(err);
    }
    next();
}

export const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password'),
    handleValidationErrors
]

export const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide a first name with at least 2 characters'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide a last name with at least 2 characters'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide a username with at least 2 characters'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more'),
    handleValidationErrors,
];
