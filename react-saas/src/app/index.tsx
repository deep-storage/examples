// import * as React from 'react';
import { connect, ComponentCreator } from 'deep-storage-react';
import { DeepStorage } from 'deep-storage';
import Component from './component';
import { Authentication } from '../authentication/index';
import LoginCreator from './Login/index';
import { History } from 'history';
import FullScreenCreator from './FullScreen/index';
import TemplateCreator from './Template/index';
import HomeCreator from './Home/index';
import AccountsCreator from './Accounts/index';

export interface AppDeepState {
}

export class AppCreator implements ComponentCreator {

    create = async () => {
        const login = new LoginCreator(
            this.storage.deep('login'),
            this.authentication,
        );
        const fullScreen = new FullScreenCreator();
        const home = new HomeCreator();
        const accounts = new AccountsCreator();
        const template = new TemplateCreator(this.authentication);

        return connect(
            {
                authentication: this.authentication
            },
            {
                Login: await login.create(),
                FullScreen: await fullScreen.create(),
                Template: await template.create(),
                Home: await home.create(),
                Accounts: await accounts.create()
            })(Component);
    }

    constructor(
        private storage: DeepStorage<AppDeepState>,
        private authentication: Authentication,
        history: History
    ) {
    }
}

export default AppCreator;