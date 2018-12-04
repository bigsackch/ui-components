// @flow
import * as React from 'react';

import { Avatar } from './Avatar';
import { COLORS, SPACING } from './constants';

import eventumSymbol from '../static/images/eventum-icon_usy2oo.svg';
import eventumLogo from '../static/images/eventum_logo_doja3b.svg';

const i18n = {
  nb: {
    account: 'Konto',
    inbox: 'Innboks',
    invoicing: 'Fakturering',
    logout: 'Logg ut',
    profile: 'Din profil',
    selectAccount: 'Velg konto',
    selectedAccount: 'Valgt konto:',
    stats: 'Statistikkpanel',
    users: 'Brukerkontoer',
    venues: 'Utleiesteder',
  },
  en: {
    account: 'Account',
    inbox: 'Inbox',
    invoicing: 'Invoicing',
    logout: 'Log out',
    profile: 'Your profile',
    selectAccount: 'Choose account',
    selectedAccount: 'Selected account:',
    stats: 'Stats dashboard',
    users: 'User accounts',
    venues: 'Venues',
  },
};

export function HeaderLink({ children, href }: {
  children: React.Node, href: string,
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

export function HeaderHostingMenu({ isAdmin, locale, profileName, profileSlug }: {
  isAdmin?: boolean, locale: 'nb' | 'en', profileName?: string, profileSlug?: string,
}) {
  const text = i18n[locale];

  return (
    <div className="main">
      <HeaderLink href="/inbox">{text.inbox}</HeaderLink>
      <HeaderLink href={profileSlug ? `/manage-account/${profileSlug}/venues` : '/hosting/venues'}>
        {text.venues}
      </HeaderLink>
      <HeaderLink href={profileSlug ? `/manage-account/${profileSlug}` : '/hosting/accounts'}>
        {text.account}
      </HeaderLink>
      <HeaderLink href="/your-profile">{text.profile}</HeaderLink>
      {isAdmin ? <HeaderLink href="/inbox/admin/users">{text.users}</HeaderLink> : null}
      {isAdmin ? <HeaderLink href="/inbox/admin/stats">{text.stats}</HeaderLink> : null}
      {isAdmin ? <HeaderLink href="/inbox/admin/invoice">{text.invoicing}</HeaderLink> : null}
      <HeaderLink href="/inbox/logout">{text.logout}</HeaderLink>
      {profileSlug ? (
        <div className="account">
          <div>{text.selectedAccount}</div>
          <HeaderLink href="/hosting/accounts">{profileName || ''}</HeaderLink>
        </div>
      ) : (
        <div className="account">
          <HeaderLink href="/hosting/accounts">{text.selectAccount}</HeaderLink>
        </div>
      )}
      {/* language=CSS */}
      <style jsx>
        {`
          .main {
            align-items: center;
            display: flex;
            flex: 1 auto;
          }
          .account {
            margin-left: auto;
            margin-right: 20px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}
HeaderHostingMenu.defaultValue = {
  locale: 'nb',
};

export function Header({ avatarSrc, avatarAlt, children }: {
  avatarSrc?: string, avatarAlt?: string, children?: React.Node,
}) {
  return (
    <div className="main">
      <div>
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
      </div>
      <div className="children">
        {children}
      </div>
      {avatarSrc ? <Avatar altPart={avatarAlt} className="mhm" src={avatarSrc} width={30} /> : null}
      {/* language=CSS */}
      <style jsx>
        {`
          .children {
            align-items: center;
            display: flex;
            flex: 1 auto;
            font-size: 1.7rem;
            justify-content: flex-end;
          }
          .main {
            display: flex;
            align-items: center;
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
