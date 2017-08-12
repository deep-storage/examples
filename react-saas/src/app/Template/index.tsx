import { connect, ComponentCreator } from 'deep-storage-react';
import Component from './component';
import { Authentication } from '../../authentication/index';

export default class TemplateCreator implements ComponentCreator {
    component: React.ComponentType;

    constructor(
        authentication: Authentication
    ) {
        this.component = connect(
            {
            },
            {
                logOut: authentication.logOut
            }
        )(Component);
    }
}
