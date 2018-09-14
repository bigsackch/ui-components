// @flow
import * as React from 'react';

type Props = {
  checked: boolean,
  label: string,
  name: string,
  onChange: (boolean) => void,
}

export function Checkbox({ checked, label, name, onChange }: Props) {
  return (
    <div className="main">
      <label>
        <input
          checked={checked}
          name={name}
          onChange={event => onChange(event.target.checked)}
          type="checkbox"
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
