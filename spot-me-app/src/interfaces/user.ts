interface SafeObject {
    id: number;
    username: string;
    email: string;
}

interface UserInstanceMethods {
    toSafeObject: () => SafeObject;
    validatePassword: (password: string) => boolean;
}

export interface DefScopeUser extends UserInstanceMethods {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    imgUrl: string;
}

export interface CurScopeUser extends DefScopeUser {
    email: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
}

export interface LoginCredentials {
    credential: string;
    password: string;
}
