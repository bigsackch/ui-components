// @flow
import * as React from 'react';
import css from 'styled-jsx/css';

import { COLORS, FONT_SIZES } from './constants';

const SIZES = {
  l: 'l',
  m: 'm',
  s: 's',
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


{ /* language=CSS */ }
const sizeSmall = css`
  button {
    -webkit-font-smoothing: antialiased;
    font-size: ${FONT_SIZES.S};
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

    case SIZES.s:
      return sizeSmall;

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
  button.disabled {
    border-color: #c4c0c0;
    color: ${COLORS.DISABLED};
  }
`;

{ /* language=CSS */ }
const styleEmphasis = css`
  button {
    background-color: #d0043c;
    border: 1px solid #d0043c;
    color: #fff;
  }
  button.disabled {
    background-color: #c4c0c0;
    border-color: #c4c0c0;
    color: ${COLORS.DISABLED};
  }
`;

{ /* language=CSS */ }
const styleLink = css`
  button {
    background-color: transparent;
    border: 0;
    color: ${COLORS.LINK};
    outline: 0;
    padding: 0 !important;
    text-decoration: none;
  }
  button:hover {
    text-decoration: underline;
  }
  button.disabled,
  button.disabled:hover {
  color: ${COLORS.DISABLED} !important;
  text-decoration: none;
  }
  
`;

{ /* language=CSS */ }
const stylePrimary = css`
  button {
    background-color: #009f94;
    border: 1px solid #009f94;
    color: #fff;
  }
  button.disabled {
    background-color: #c4c0c0;
    border-color: #c4c0c0;
    color: ${COLORS.DISABLED};
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
  btnSize?: btnSizeType,
  children: React.Node,
  disabled?: boolean,
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void,
  className?: string,
  style?: Object,
  otherProps?: Object,
}

export function Button({
  block,
  btnSize,
  btnStyle,
  children,
  disabled,
  onClick,
  className,
  ...otherProps
}: ButtonProps) {
  const sizeCss = sizeStyle(btnSize);
  const styleCss = styleStyle(btnStyle);

  return (
    <button
      disabled={disabled}
      className={(disabled ? "disabled " : "") + (className || "")}
      onClick={event => onClick(event)}
      type="button"
      {...otherProps}
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
            display: ${block ? 'block' : 'inline-block'};
          }
        `}
      </style>
    </button>
  );
}

Button.defaultProps = {
  btnSize: 'm',
};
