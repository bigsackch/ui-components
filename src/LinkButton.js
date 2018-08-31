// @flow
import * as React from 'react';

import { COLORS, FONT_SIZES } from './constants';

type Props = {
  children: React.Node,
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void,
  style?: Object,
};

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
        `}
      </style>
    </button>
  );
}
