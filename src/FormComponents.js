// @flow
import * as React from 'react';
import css from 'styled-jsx/css';

type LabelProps = {
  htmlFor: string,
  description?: string,
  label?: string,
}

export function Label({ description, htmlFor, label }: LabelProps) {
  return (
    <div className="mod">
      {label ? (
        <label htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      {description ? (
        <div className="subtle">{description}</div>
      ) : null}
      { /* language=CSS */ }
      <style jsx>{`
        label {
          font-size: 2.2rem;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}

function ErrorMessage({ children }: { children: React.Node }) {
  return (
    <div className="mts">
      {children}
      { /* language=CSS */ }
      <style jsx>{`
        div {
          color: #d93900;
        }
      `}</style>
    </div>
  );
}

type InputProps = {
  errorMessage?: string,
  hasError?: boolean,
  id: string,
  onChange: string => void,
  type: string,
  value: string | number,
  otherProps?: Object,
}

{ /* language=CSS */ }
const defaultInputStyle = css`
  input,
  select,
  textarea {
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #aaa;
    font-size: 1.9rem;
    font-weight: 300;
    letter-spacing: .02rem;
    padding: 10px;
    width: 100%;
  }
  input.error,
  select.error,
  textarea.error {
    background-color: rgb(255, 246, 246);
    border-color: #e0b4b4;
    color: #9f3a38;
  }`;

type SelectProps = {
  children: React.Node,
  description?: string,
  errorMessage?: string,
  hasError?: boolean,
  id: string,
  label?: string,
  onChange: string => void,
  otherProps?: Object,
  value: string,
}

export function Select({
  children,
  description,
  errorMessage,
  hasError,
  id,
  label,
  onChange,
  value,
  ...otherProps
}: SelectProps) {
  return (
    <div>
      {label || description ? <Label htmlFor={id} description={description} label={label} /> : null}
      <div className="mod">
        <div className="select">
          <select
            id={id}
            onChange={onChange}
            value={value || 'default'}
            {...otherProps}
          >
            {children}
          </select>
        </div>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      </div>
      { /* language=CSS */ }
      <style jsx>{defaultInputStyle}</style>
      <style jsx>
        {`
        .select {
          position: relative;
          width: 100%;
        }
        .select:before {
          -webkit-font-smoothing: none;
          bottom: 1px;
          color: #767676;
          content: '\\25bc';
          line-height: 1;
          padding-top: 0.7em;
          pointer-events: none;
          position: absolute;
          right: 0;
          text-align: center;
          top: 0;
          transform: scale(0.84, 0.42);
          width: 2em;
        }
        select {
          -webkit-appearance: none;
          height: 50px;
          padding: 13px 30px 13px 10px;
        }
      `}
      </style>
    </div>
  );
}

export class FormInput extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      errorMessage,
      hasError,
      id,
      onChange,
      type,
      value,
      inputComponent,
      ...otherProps
    } = this.props;
    let InputComponent = inputComponent;

    return (
      <div className="mod">
        <InputComponent
          className={hasError ? 'error' : null}
          id={id}
          onChange={event => onChange(event.target.value)}
          type={type}
          value={value}
          {...otherProps}
        />
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        { /* language=CSS */ }
        <style jsx>{defaultInputStyle}</style>
        <style jsx>{`
        input {
          height: 50px;
        }
      `}</style>
      </div>
    );
  }
}

FormInput.defaultProps = {
  inputComponent: 'input',
};

type TextInputProps = {
  description?: string,
  errorMessage?: string,
  hasError?: boolean,
  id: string,
  label?: string,
  onChange: string => void,
  otherProps?: Object,
  value: string,
}

export function TextInput({
  description,
  errorMessage,
  hasError,
  id,
  label,
  onChange,
  value,
  ...otherProps
}: TextInputProps) {
  return (
    <div>
      {label || description ? <Label htmlFor={id} description={description} label={label} /> : null}
      <FormInput
        errorMessage={errorMessage}
        hasError={hasError}
        id={id}
        onChange={onChange}
        type="text"
        value={value}
        {...otherProps}
      />
    </div>
  );
}


export class Textarea extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      description,
      errorMessage,
      hasError,
      id,
      label,
      onChange,
      rows,
      value,
      inputComponent,
      ...otherProps
    } = this.props;
    let InputComponent = inputComponent;

    return (
      <div>
        {label || description ? <Label htmlFor={id} description={description} label={label} /> : null}
        <div className="mod">
          <InputComponent
            className={hasError ? 'error' : null}
            id={id}
            onChange={event => onChange(event.target.value)}
            rows={rows || 4}
            value={value}
            {...otherProps}
          />
          {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        </div>
        { /* language=CSS */ }
        <style jsx>{defaultInputStyle}</style>
        <style jsx>{`
          textarea {
            line-height: inherit;
            resize: vertical;
          }
      `}</style>
      </div>

    );
  }
}

Textarea.defaultProps = {
  inputComponent: 'textarea',
};