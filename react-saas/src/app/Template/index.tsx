import { connect, ComponentCreator } from 'deep-storage-react';
import Component from './component';
import { Authentication } from '../../authentication/index';

export default class TemplateCreator implements ComponentCreator {
    component: () => Promise<React.ComponentType>;

    constructor(
        authentication: Authentication
    ) {
        this.component = async () => connect(
            {
            },
            {
                logOut: authentication.logOut
            }
        )(Component);
    }
}
