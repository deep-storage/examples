import { ComponentCreator } from 'deep-storage-react';
import Component from './component';

// this could also just be a regular component. ComponentCreator is
// only required for components that need dependency injection
export default class FullScreenCreator implements ComponentCreator {
    component = Component;
    constructor(
    ) {
        this.component = Component;
    }
}