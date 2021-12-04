interface SafeObject {
    id: number;
    username: string;
    email: string;
}

interface UserInstanceMethods {
    toSafeObject: () => SafeObject;
    validatePassword: (password: string) => boolean;
}

export interface User extends UserInstanceMethods {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    imgUrl: string;
}

export interface SessionUser extends User {
    email: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
}

export interface LoginCredentials {
    credential: string;
    password: string;
}

export interface SignupFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}
