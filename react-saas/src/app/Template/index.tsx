import { connect, ComponentCreator } from 'deep-storage-react';
import Component from './component';
import { Authentication } from '../../authentication/index';

export default class TemplateCreator implements ComponentCreator {
    create: () => Promise<React.ComponentType>;

    constructor(
        authentication: Authentication
    ) {
        this.create = async () => connect(
            {
            },
            {
                logOut: authentication.logOut
            }
        )(Component);
    }
}
