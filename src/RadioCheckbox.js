// @flow
import * as React from 'react';

import { COLORS, FONT_SIZES } from './constants';

type InputProps = {
  checked: boolean,
  label: string,
  name: string,
  onChange: (boolean) => void,
  type: 'radio'|'checkbox',
}

function Input({ checked, label, name, onChange, type }: InputProps) {
  return (
    <div className="main">
      <label>
        <input
          checked={checked}
          name={name}
          onChange={event => onChange(event.target.checked)}
          type={type}
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
}

export function Checkbox({ checked, label, name, onChange }: CheckboxProps) {
  return (
    <Input
      checked={checked}
      label={label}
      name={name}
      onChange={onChange}
      type="checkbox"
    />
  );
}

type RadioProps = {
  checked: boolean,
  label: string,
  name: string,
  onChange: (boolean) => void,
}

export function Radio({ checked, label, name, onChange }: RadioProps) {
  return (
    <Input
      checked={checked}
      label={label}
      name={name}
      onChange={onChange}
      type="radio"
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
          border: 0,
        }
        legend {
          color: ${COLORS.SUBTLE}
        }
        .flex-wrapper {
        display: flex;
        flex-flow: row wrap;
        }
      `}</style>
    </div>
  );
}
