import { SessionUser } from "./user";

export interface Action {
    type: string;
    payload?: any
}

interface SessionState {
    user: SessionUser
}

export interface State {
    session: SessionState;
    friends: any;
    payments: any;
    transfers: any;
    searchResults: any;
}
