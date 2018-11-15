// @flow
import * as React from 'react';

import { Avatar } from './Avatar';
import { COLORS, SPACING } from './constants';

import eventumSymbol from '../static/images/eventum-icon_usy2oo.svg';
import eventumLogo from '../static/images/eventum_logo_doja3b.svg';

export function HeaderLink({ children, href, position }: {
  children: React.Node, href: string, position?: 'left'|'right',
}) {
  return (
    <div>
      <a href={href}>{children}</a>
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
HeaderLink.defaulProps = {
  position: 'right',
};

const i18n = {
  nb: {
    inbox: 'Innboks',
    venues: 'Utleiesteder',
    account: 'Konto',
    profile: 'Din profil',
  },
  en: {
    inbox: 'Inbox',
    venues: 'Venues',
    account: 'Account',
    profile: 'Your profile',
  },
};

export function HostAdminHeaderMenu({ locale }: { locale: 'nb'|'en' }) {
  const text = i18n[locale];

  return (
    <React.Fragment>
      <HeaderLink href="/inbox">{text.inbox}</HeaderLink>
      <HeaderLink href="/hosting/venues">{text.venues}</HeaderLink>
      <HeaderLink href="/hosting/account">{text.account}</HeaderLink>
      <HeaderLink href="/hosting/profile">{text.profile}</HeaderLink>
    </React.Fragment>
  );
}
HostAdminHeaderMenu.defaultValue = {
  locale: 'nb',
};

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
