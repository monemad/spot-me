import { CurScopeUser } from "./user";

export interface Action {
    type: string;
    payload?: any
}

interface SessionState {
    user: CurScopeUser
}

export interface State {
    session: SessionState
}
