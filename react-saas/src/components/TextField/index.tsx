import * as React from 'react';
import { ChangeEventHandler, FocusEventHandler } from 'react';
import * as classnames from 'classnames';
import { DeepForm } from 'deep-storage-react';

export interface TextFieldProps {
    onChange?: ChangeEventHandler<{}>;
    onBlur?: FocusEventHandler<{}>;
    form: DeepForm;
    name: string;
    label?: string;
    type?: string;
    autoComplete?: string;
}

export const TextField = (props: TextFieldProps) => {
    const { form } = props;
    const field = form.fields[props.name];
    const showError = !!(field && field.touched && field.error);
    return (
        <div className="field">
            {props.label && <label className="label">{props.label}</label>}
            <div className="control">
                <input
                    name={props.name}
                    onChange={props.onChange || form.changeEvent}
                    onBlur={props.onBlur || form.blurEvent}
                    value={field ? field.value : ''}
                    className={classnames('input', { ['is-danger']: showError })}
                    type={props.type || 'text'}
                    autoComplete={props.autoComplete != null ? props.autoComplete : undefined}
                />
            </div>
            {
                showError
                    ? <p className={classnames('help', 'is-danger')}>{field ? field.error : null}</p>
                    : null
            }
        </div>
    );
};

export default TextField;