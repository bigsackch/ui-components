// @flow
import * as React from 'react';

import { AvatarMenu } from './HeaderOptionsEventum';
import { Button } from './Buttons';
import { ModalMenu } from './Modal';
import { COLORS, SPACING } from './constants';

import eventumSymbol from '../static/images/eventum-icon_usy2oo.svg';
import eventumLogo from '../static/images/eventum_logo_doja3b.svg';
import iconArrowDown from '../static/images/icons/Arrow-Down-Line-Black-24.svg';

export function HeaderButton({ children, onClick }: {
  children: React.Node, onClick: () => void,
}) {
  const buttonStyle = {
    color: COLORS.DEFAULT,
    WebkitFontSmoothing: "auto",
  };

  return (
    <div>
      <Button
        btnSize="s"
        btnStyle="link"
        onClick={onClick}
        style={buttonStyle}
      >{children}</Button>
      { /* language=CSS */ }
      <style jsx>{`
        div {
          padding: 0 ${SPACING.M}
        }
      `}</style>
    </div>
  );
}

export function HeaderLink({ children, href, onClick }: {
  children: React.Node, href: string, onClick?: (event: SyntheticEvent<HTMLAnchorElement>) => void,
}) {
  return (
    <div>
      <a href={href} onClick={onClick}>{children}</a>
      { /* language=CSS */ }
      <style jsx>{`
        a {
          color: ${COLORS.DEFAULT} !important;
          font-weight: 400 !important;
          -webkit-font-smoothing: auto !important;
        }
        div {
          padding: 0 ${SPACING.M}
        }
      `}</style>
    </div>
  );
}

export class HeaderButtonMenu extends React.Component<{ buttonChild: React.Node,
                                                        children: React.Node,
                                                        topLock?: number,
                                                        hasArrow?: boolean,},
                                                      { showOptions: boolean }> {
  state = {
    showOptions: false,
  };

  toggleShowOptions = () => {
    this.setState(prevState => ({ showOptions: !prevState.showOptions }));
  };

  render() {
    const { props, state, toggleShowOptions } = this;

    const childrenWithToggler = React.Children.map(props.children, child =>
      React.cloneElement(child, { onClick: toggleShowOptions })
    );

    return (
      <div>
        <HeaderButton onClick={toggleShowOptions}>
          {props.buttonChild}
          {props.hasArrow ? (
            <img
              alt=""
              src={iconArrowDown}
              width="10"
              style={{ transform: state.showOptions ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          ) : null}
        </HeaderButton>
        <div className="options">
          {state.showOptions ? (
            <ModalMenu onClose={toggleShowOptions} topLock={props.topLock || 70}>
              {childrenWithToggler}
            </ModalMenu>
          ): null}
        </div>
        { /* language=CSS */ }
        <style jsx>{`
          .options {
            position: relative;
          }
          img {
            margin-left: 6px;
            transition-duration: 250ms;
            transition-timing-function: ease-in-out;
          }
        `}</style>
      </div>
    );
  }
}

export function ModalMenuLink({ children, href, onClick }: {
  children: React.Node, href: string, onClick?: (event: SyntheticEvent<>) => void,
}) {
  return (
    <a href={href} onClick={onClick}>
      <div>{children}</div>
      { /* language=CSS */ }
      <style jsx>{`
        a {
          color: ${COLORS.DEFAULT};
          display: block;
          padding: 0 ${SPACING.M};
          text-decoration: none;
        }
        div {
          border-bottom: 1px solid ${COLORS.BORDER};
          padding: ${SPACING.M} 0;
        }
        a:hover {
          text-decoration: none;
        }
        a:hover div {
          border-bottom: 1px solid ${COLORS.DEFAULT};
        }
      `}</style>
    </a>
  );
}

export function Header({ avatarSrc, avatarAlt, children, locale }: {
  avatarSrc?: string, avatarAlt?: string, children?: React.Node, locale: string, accountSlug?: string,
}) {
  return (
    <div className="main">
      <div>
        <a href="/">
          <img
            alt="Eventum symbol"
            className="symbol"
            height="34"
            src={eventumSymbol}
          />
          <img
            alt="Eventum logo"
            className="logo"
            height="23"
            src={eventumLogo}
          />
        </a>
      </div>
      <div className="children">
        {children}
      </div>
      {avatarSrc ? (
        <AvatarMenu
          avatarAlt={avatarAlt}
          avatarSrc={avatarSrc}
          locale={locale}
        />) : null}
      {/* language=CSS */}
      <style jsx>
        {`
          .children {
            align-items: center;
            display: flex;
            flex: 1 auto;
            justify-content: flex-end;
          }
          .main {
            align-items: center;
            display: flex;
            font-size: 1.7rem;
            height: 70px;
          }
          .symbol {
            margin: 8px ${SPACING.M} 0;
          }
          .logo {
            display: none;
            margin: 0 ${SPACING.M};
          }
          @media only screen and (min-width: 768px) {
            .symbol {
              display: none;
            }
            .logo {
              display: block;
            }
          }
          @media only screen and (min-width: 1200px) {
            .main {
              padding: 0 ${SPACING.M};
            }
          }
        `}
      </style>
    </div>
  );
}
