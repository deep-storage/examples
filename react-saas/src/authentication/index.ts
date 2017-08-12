
import { UsesDeepStorage, DeepStorage } from 'deep-storage';

export interface AuthenticationDeepState {
    token?: string;
    started: boolean;
}

export interface Authentication {
    loggedIn: boolean;
    started: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    start: () => Promise<boolean>;
    logOut: () => Promise<void>;
}

export default class MockAuthentication
    implements Authentication, UsesDeepStorage<AuthenticationDeepState> {

    storage: DeepStorage<AuthenticationDeepState>;

    constructor(
        storage: DeepStorage<AuthenticationDeepState>
    ) {
        this.storage = storage.init({
            started: false
        });
    }

    get loggedIn() { return !!this.storage.state.token; }
    get started() { return !!this.storage.state.started; }
    start = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await this.storage.setIn('token')(token);
                return true;
            }
            return false;
        } finally {
            await this.storage.setIn('started')(true);
        }
    }
    login = async (username: string, password: string) => {
        if (username === 'admin' && password === 'admin') {
            const token = 'token';
            await this.storage.setIn('token')(token);
            localStorage.setItem('token', token);
            return true;
        } else {
            return false;
        }
    }
    logOut = async () => {
        await this.storage.updateIn('token')(() => undefined);
        localStorage.removeItem('token');
    }
}