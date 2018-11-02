// @flow
import * as React from 'react';

import { COLORS, FONT_SIZES, SPACING } from './constants';

type InputProps = {
  checked: boolean,
  label: string,
  name: string,
  onChange: (boolean) => void,
  type: 'radio'|'checkbox',
  otherProps?: Object,
}

function Input({ checked, label, name, onChange, type, ...otherProps }: InputProps) {
  return (
    <div className="main">
      <label>
        <input
          checked={checked}
          name={name}
          onChange={event => onChange(event.target.checked)}
          type={type}
          {...otherProps}
        />
        {label}
      </label>
      { /* language=CSS */ }
      <style jsx>{`
        .main {
          align-items: center;
          display: flex;
          margin: 5px 0;
        }
        input {
          cursor: pointer;
          margin: 0 10px 5px;
        }
        label {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

type CheckboxProps = {
  checked: boolean,
  label: string,
  name: string,
  onChange: (boolean) => void,
  otherProps?: Object,
}

export function Checkbox({ checked, label, name, onChange, ...otherProps }: CheckboxProps) {
  return (
    <Input
      checked={checked}
      label={label}
      name={name}
      onChange={onChange}
      type="checkbox"
      {...otherProps}
    />
  );
}

type RadioProps = {
  checked: boolean,
  label: string,
  name: string,
  onChange: (boolean) => void,
  otherProps?: Object,
}

export function Radio({ checked, label, name, onChange, ...otherProps }: RadioProps) {
  return (
    <Input
      checked={checked}
      label={label}
      name={name}
      onChange={onChange}
      type="radio"
      {...otherProps}
    />
  );
}

type RadioGroupProps = {
  heading?: string,
  description: string,
  children: React.Node,
}

export function RadioGroup({ heading, description, children }: RadioGroupProps) {
  return (
    <div>
      {heading ? <h2>{heading}</h2> : null}
      <fieldset>
        <legend>{description}</legend>
        <div className="flex-wrapper">
          {children}
        </div>
      </fieldset>
      { /* language=CSS */ }
      <style jsx>{`
        h2 {
        font-size: ${FONT_SIZES.L};
        margin-bottom: 0;
        }
        fieldset {
          margin: 0 ${SPACING.M} ${SPACING.M};
          border: 0;
        }
        legend {
          color: ${COLORS.SUBTLE};
          margin-bottom: ${SPACING.S};
        }
        .flex-wrapper {
        display: flex;
        flex-flow: row wrap;
        }
      `}</style>
    </div>
  );
}

export { RadioGroup as CheckboxGroup };
