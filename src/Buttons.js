// @flow
import * as React from 'react';

import { COLORS, FONT_SIZES } from './constants';

type Props = {
  children: React.Node,
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void,
  style?: Object,
};

export function ButtonBordered({ children, onClick, style }: Props) {
  return (
    <button
      onClick={event => onClick(event)}
      style={style}
      type="button"
    >
      {children}
      {/* language=CSS */}
      <style jsx>
        {`
          button {
            background-color: transparent;
            border-radius: 4px;
            border: 1px solid ${COLORS.LINK};
            color: ${COLORS.LINK};
            cursor: pointer;
            font-size: ${FONT_SIZES.M};
            font-weight: 400;
            padding: 9px 22px;
            position: relative;
            white-space: nowrap;
          }
        `}
      </style>
    </button>
  );
}

export function LinkButton({ children, onClick, style }: Props) {
  return (
    <button
      onClick={event => onClick(event)}
      style={style}
      type="button"
    >
      {children}
      { /* language=CSS */ }
      <style jsx>
        {`
          button {
            -webkit-font-smoothing: auto;
            background-color: transparent;
            border: 0;
            color: ${COLORS.LINK};
            cursor: pointer;
            font-size: ${FONT_SIZES.M};
            font-weight: 400;
            outline: 0;
            text-decoration: none;
          }
          button:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </button>
  );
}
