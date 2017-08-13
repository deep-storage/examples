import { connect, ComponentCreator } from 'deep-storage-react';
import { DeepStorage } from 'deep-storage';
import Component from './component';
import { Authentication } from '../../authentication/index';
import { deepForm } from 'deep-storage-react';
import LoginValidator from './validator';

export interface LoginDeepState {
    lastLoginFailed: boolean;
}

export interface LoginDetails {
    username: string;
    password: string;
}

export default class LoginCreator implements ComponentCreator {

    create = async () => {
        await this.storage.setIn()({
            lastLoginFailed: false
        });
        const form = deepForm(this.storage.deep('form'), new LoginValidator());
        return connect(
            {
                authentication: this.authentication,
                ...this.storage.props,
                form
            },
            {
                // adds a prop called 'login' to the component
                login: async () => {
                    const { username, password } = form.data();
                    const success = await this.authentication.login(username, password);
                    if (success) {
                        await this.storage.setIn('lastLoginFailed')(false);
                    } else {
                        await this.storage.setIn('lastLoginFailed')(true);
                    }
                }
            }
        )(Component);
    }

    constructor(
        private storage: DeepStorage<LoginDeepState>,
        private authentication: Authentication,
    ) {
    }
}