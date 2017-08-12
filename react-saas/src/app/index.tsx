import * as React from 'react';
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

export default class AppCreator implements ComponentCreator {
    component: React.ComponentType;
    constructor(
        storage: DeepStorage<AppDeepState>,
        authentication: Authentication,
        history: History
    ) {
        const login = new LoginCreator(
            storage.deep('login'),
            authentication,
        );
        const fullScreen = new FullScreenCreator();
        const home = new HomeCreator();
        const accounts = new AccountsCreator();
        const template = new TemplateCreator(authentication);
        this.component = connect(
            {
                authentication
            },
            {
                Login: login.component,
                FullScreen: fullScreen.component,
                Template: template.component,
                Home: home.component,
                Accounts: accounts.component

            })(Component);
    }
}