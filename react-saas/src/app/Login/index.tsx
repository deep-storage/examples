import { connect, ComponentCreator } from 'deep-storage-react';
import { DeepStorage } from 'deep-storage';
import Component from './component';
import { Authentication } from '../../authentication/index';
import { deepForm } from 'deep-storage-react';
import LoginValidator from './validator';
import { DeepForm } from '../../../../../deep-storage-react/forms';

export interface LoginDeepState {
    lastLoginFailed: boolean;
}

export interface LoginDetails {
    username: string;
    password: string;
}

export default class LoginCreator implements ComponentCreator {
    component: React.ComponentType;
    storage: DeepStorage<LoginDeepState>;
    form: DeepForm<LoginDetails>;

    login = async() => {
        const { username, password } = this.form.data();
        const success = await this.authentication.login(username, password);
        if (success) {
            await this.storage.setIn('lastLoginFailed')(false);
        } else {
            await this.storage.setIn('lastLoginFailed')(true);
        }
    }

    constructor(
        storage: DeepStorage<LoginDeepState>,
        private authentication: Authentication,
    ) {
        this.storage = storage.init({
            lastLoginFailed: false
        });

        this.form = deepForm(this.storage.deep('form'), new LoginValidator());

        this.component = connect(
            {
                authentication: this.authentication,
                ...this.storage.props,
                form: this.form
            },
            {
                login: this.login
            }
        )(Component);
    }
}