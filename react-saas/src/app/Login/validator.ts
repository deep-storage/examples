import { DeepValidator, DeepForm, FieldChange } from 'deep-storage-react';
import { LoginDetails } from './index';

export default class LoginValidator implements DeepValidator<LoginDetails> {
    validate(form: DeepForm<LoginDetails>, fieldChange: FieldChange) {
        const errors: {[key: string]: string} = {};

        const data = form.data();

        if (!data.password || data.password.trim().length === 0) {
            errors.password = 'Password is required';
        }
        if (!data.username || data.username.trim().length === 0) {
            errors.username = 'Username is required';
        }

        return {
            errors
        };
    }

}