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
    <div className="mam">
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
  textarea.error {
    background-color: rgb(255, 246, 246);
    border-color: #e0b4b4;
    color: #9f3a38;
  }`;

function FormInput({
  errorMessage,
  hasError,
  id,
  onChange,
  type,
  value,
  ...otherProps
}: InputProps) {
  return (
    <div className="mam">
      <input
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

export function Textarea({
  description,
  errorMessage,
  hasError,
  id,
  label,
  onChange,
  rows,
  value,
  ...otherProps
}: { ...TextInputProps, rows?: number }) {
  return (
    <div>
      {label || description ? <Label htmlFor={id} description={description} label={label} /> : null}
      <div className="mam">
        <textarea
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
