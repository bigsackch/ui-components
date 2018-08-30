// @flow
import * as React from 'react';

import { Avatar } from './Avatar';

import eventumSymbol from '../static/images/eventum-icon_usy2oo.svg';
import eventumLogo from '../static/images/eventum_logo_doja3b.svg';

export function Header({ avatarSrc, avatarAlt, children }: {
  avatarSrc?: string, avatarAlt?: string, children?: React.Node,
}) {
  return (
    <div className="main">
      <div className="aligned">
        <a href="/">
          <img
            alt="Eventum symbol"
            className="symbol mhm"
            height="34"
            src={eventumSymbol}
          />
          <img
            alt="Eventum logo"
            className="logo mhm"
            height="23"
            src={eventumLogo}
          />
        </a>
        <div className="aligned items">
          {children}
          {avatarSrc ? <Avatar altPart={avatarAlt} className="mhm" src={avatarSrc} width={30} /> : null}
        </div>
      </div>
      {/* language=CSS */}
      <style jsx>
        {`
          .aligned {
            display: flex;
            align-items: center;
            min-height: 100%;
          }
          .items {
            font-size: 1.7rem;
            margin-left: auto;
            justify-content: flex-end;
          }
          .main {
            height: 70px;
          }
          .symbol {
            margin-top: 8px;
          }
          .logo {
            display: none;
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
              padding: 0 20px;
            }
          }
        `}
      </style>
    </div>
  );
}
