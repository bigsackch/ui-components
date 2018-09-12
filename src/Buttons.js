// @flow
import * as React from 'react';
import css from 'styled-jsx/css';

import { COLORS, FONT_SIZES } from './constants';

const SIZES = {
  l: 'l',
  m: 'm',
};

const STYLES = {
  border: 'border',
  emphasis: 'emphasis',
  link: 'link',
  primary: 'primary',
};

type btnSizeType = $Keys<typeof SIZES>;
type btnStyleType = $Keys<typeof STYLES>;

{ /* language=CSS */ }
const sizeLarge = css`
  button {
    -webkit-font-smoothing: antialiased;
    font-size: 2.2rem;
    font-weight: 400;
    letter-spacing: .05rem;
    padding: 12px 24px;
  }
`;

{ /* language=CSS */ }
const sizeMedium = css`
  button {
    -webkit-font-smoothing: antialiased;
    font-size: ${FONT_SIZES.M};
    font-weight: 400;
    letter-spacing: .02rem;
    padding: 9px 22px;
  }
`;

const sizeStyle = (size): btnSizeType => {
  switch (size) {
    case SIZES.l:
      return sizeLarge;

    case SIZES.m:
      return sizeMedium;

    default:
      return sizeMedium;
  }
};

{ /* language=CSS */ }
const styleBorder = css`
  button {
    background-color: transparent;
    border: 1px solid ${COLORS.LINK};
    color: ${COLORS.LINK};
  }
`;

{ /* language=CSS */ }
const styleEmphasis = css`
  button {
    background-color: #d0043c;
    border: 1px solid #d0043c;
    color: #fff;
  }
`;

{ /* language=CSS */ }
const styleLink = css`
  button {
    background-color: transparent;
    border: 0;
    color: ${COLORS.LINK};
    outline: 0;
    padding: 0;
    text-decoration: none;
  }
  button:hover {
    text-decoration: underline;
  }
`;

{ /* language=CSS */ }
const stylePrimary = css`
  button {
    background-color: #009f94;
    border: 1px solid #009f94;
    color: #fff;
  }
`;

const styleStyle = (style): btnStyleType => {
  switch (style) {
    case STYLES.border:
      return styleBorder;

    case STYLES.emphasis:
      return styleEmphasis;

    case STYLES.link:
      return styleLink;

    case STYLES.primary:
      return stylePrimary;

    default:
      return stylePrimary;
  }
};

type ButtonProps = {
  block?: boolean,
  btnStyle: btnStyleType,
  btnSize: btnSizeType,
  children: React.Node,
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void,
  style?: Object,
}

export function Button({
  children,
  onClick,
  style,
  btnSize,
  btnStyle,
  block,
}: ButtonProps) {
  const sizeCss = sizeStyle(btnSize);
  const styleCss = styleStyle(btnStyle);

  return (
    <button
      onClick={event => onClick(event)}
      style={style}
      type="button"
    >
      {children}
      <style jsx>{sizeCss}</style>
      <style jsx>{styleCss}</style>
      { /* language=CSS */ }
      <style jsx>
        {`
          button {
            border-radius: 4px;
            cursor: pointer;
            position: relative;
            white-space: nowrap;
          }
        `}
      </style>
      { /* language=CSS */ }
      <style jsx>
        {`
          button {
            width: ${block ? '100%' : 'auto'};
          }
        `}
      </style>
    </button>
  );
}
