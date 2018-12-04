// @flow
import * as React from 'react';

import { Avatar } from './Avatar';
import { Button } from './Buttons';
import { COLORS, SPACING } from './constants';

import eventumSymbol from '../static/images/eventum-icon_usy2oo.svg';
import eventumLogo from '../static/images/eventum_logo_doja3b.svg';

const i18n = {
  nb: {
    account: 'Konto',
    admin: 'Admin',
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
    admin: 'Admin',
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

function HeaderMenuModal({ children }: { children: React.Node }) {
  return (
    <div>
      {children}
      { /* language=CSS */ }
      <style jsx>
        {`
        div {
          background-color: #fff;
          border-radius: 3px;
          border: 1px solid #ebe8e3;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          min-width: 280px;
          position: absolute;
          right: 0;
          text-align: left;
          top: 0;
          z-index: 100000;
        }
        ul {
          margin: 0;
          padding: 10px 0;
        }
      `}
      </style>
    </div>
  );
}

function AdminMenuOptions({ locale }: { locale: string }) {
  const text = i18n[locale];

  return (
    <HeaderMenuModal>
      <ul>
        <li><HeaderLink href="/inbox/admin/users">{text.users}</HeaderLink></li>
        <li><HeaderLink href="/inbox/admin/stats">{text.stats}</HeaderLink></li>
        <li><HeaderLink href="/inbox/admin/invoice">{text.invoicing}</HeaderLink></li>
      </ul>
      { /* language=CSS */ }
      <style jsx>{`
        li {
          padding: 10px 0;
          border-bottom: ${COLORS.BORDER};
        }
        ul {
          margin-left: 0;
          margin-right: 0;
        }
      `}</style>
    </HeaderMenuModal>
  );
}

export class AdminMenuLink extends React.Component<{ locale: string }, { showOptions: boolean }> {
  state = {
    showOptions: false,
  };

  toggleShowOptions = () => {
    this.setState(prevState => ({ showOptions: !prevState.showOptions }));
  };

  render() {
    const { props, state, toggleShowOptions } = this;
    const text = i18n[props.locale];

    return (
      <div>
        <Button
          btnStyle="link"
          onClick={toggleShowOptions}
        >{text.admin}</Button>
        <div className="options">
          {state.showOptions ? <AdminMenuOptions locale={props.locale} /> : null}
        </div>
        { /* language=CSS */ }
        <style jsx>{`
          div {
            border-bottom: ${COLORS.BORDER};
          }
          .options {
            position: relative;
          }
        `}</style>
      </div>
    );
  }
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
      {isAdmin ? <AdminMenuLink locale={locale} /> : null}
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
