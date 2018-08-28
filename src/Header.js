// @flow
import * as React from 'react';

import eventumSymbol from '../static/images/eventum-icon_usy2oo.svg';
import eventumLogo from '../static/images/eventum_logo_doja3b.svg';

export function Header({ children }: { children: React.Node }) {
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
        {children}
      </div>
      {/* language=CSS */}
      <style jsx>
        {`
          .aligned {
            min-height: 100%;
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
