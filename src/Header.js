// @flow
import * as React from 'react';

import { Avatar } from './Avatar';
import { Backdrop } from './Backdrop';
import { Button } from './Buttons';
import { COLORS, SPACING } from './constants';

import eventumSymbol from '../static/images/eventum-icon_usy2oo.svg';
import eventumLogo from '../static/images/eventum_logo_doja3b.svg';

const i18n = {
  nb: {
    account: 'Kontoinstillinger',
    admin: 'Admin',
    inbox: 'Innboks',
    invoicing: 'Fakturering',
    logout: 'Logg ut',
    profile: 'Rediger profil',
    selectAccount: 'Velg konto',
    selectedAccount: 'Valgt konto:',
    stats: 'Statistikkpanel',
    users: 'Brukerkontoer',
    venues: 'Utleiesteder',
  },
  en: {
    account: 'Account settings',
    admin: 'Admin',
    inbox: 'Inbox',
    invoicing: 'Invoicing',
    logout: 'Log out',
    profile: 'Edit profile',
    selectAccount: 'Choose account',
    selectedAccount: 'Selected account:',
    stats: 'Stats dashboard',
    users: 'User accounts',
    venues: 'Venues',
  },
};

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

function HeaderMenuModal({ children, onClose }: { children: React.Node, onClose: () => void, }) {
  return (
    <div>
      <Backdrop onClick={onClose} />
      <div className="children">
        {children}
      </div>
      { /* language=CSS */ }
      <style jsx>
        {`
        .children {
          background-color: #fff;
          border-radius: 3px;
          border: 1px solid #ebe8e3;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          min-width: 280px;
          position: absolute;
          right: 0;
          text-align: left;
          top: ${SPACING.M};
          z-index: 100000;
        }
      `}
      </style>
    </div>
  );
}

function MenuListLink({ children, href }: { children: React.Node, href: string }) {
  return (
    <li>
      <a href={href}>{children}</a>
      { /* language=CSS */ }
      <style jsx>{`
        a {
          border-bottom: 1px solid ${COLORS.BORDER};
          color: ${COLORS.DEFAULT};
          display: block;
          padding: ${SPACING.M} 0;
          text-decoration: none;
        }
        a:hover {
          border-bottom: 1px solid ${COLORS.DEFAULT};
          text-decoration: none;
        }
      `}</style>
    </li>
  );
}

function AdminMenuOptions({ locale, onClose }: { locale: string, onClose: () => void }) {
  const text = i18n[locale];

  return (
    <HeaderMenuModal onClose={onClose}>
      <ul>
        <MenuListLink href="/inbox/admin/users">{text.users}</MenuListLink>
        <MenuListLink href="/inbox/admin/stats">{text.stats}</MenuListLink>
        <MenuListLink href="/inbox/admin/invoice">{text.invoicing}</MenuListLink>
      </ul>
      { /* language=CSS */ }
      <style jsx>{`
        ul {
          margin-top: 0;
          margin-bottom: 0;
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
        <HeaderButton onClick={toggleShowOptions}>{text.admin}</HeaderButton>
        <div className="options">
          {state.showOptions ? <AdminMenuOptions locale={props.locale} onClose={toggleShowOptions} /> : null}
        </div>
        { /* language=CSS */ }
        <style jsx>{`
          .options {
            position: relative;
          }
        `}</style>
      </div>
    );
  }
}

function UserMenuOptions({ locale, onClose, profileSlug }: { locale: string, onClose: () => void, profileSlug?: string }) {
  const text = i18n[locale];

  return (
    <HeaderMenuModal onClose={onClose}>
      <ul>
        <MenuListLink href="/your-profile">{text.profile}</MenuListLink>
        <MenuListLink href={profileSlug ? `/manage-account/${profileSlug}` : '/hosting/accounts'}>
          {text.account}
        </MenuListLink>
        <MenuListLink href="/inbox/logout">{text.logout}</MenuListLink>
      </ul>
      { /* language=CSS */ }
      <style jsx>{`
        ul {
          margin-top: 0;
          margin-bottom: 0;
        }
      `}</style>
    </HeaderMenuModal>
  );
}

export class AvatarMenuLink extends React.Component<
  { avatarAlt: ?string, avatarSrc: string, locale: string, profileSlug?: string }, { showOptions: boolean }
> {
  state = {
    showOptions: false,
  };

  toggleShowOptions = () => {
    this.setState(prevState => ({ showOptions: !prevState.showOptions }));
  };

  render() {
    const { props, state, toggleShowOptions } = this;

    return (
      <div>
        <HeaderButton onClick={toggleShowOptions}>
          <Avatar altPart={props.avatarAlt} src={props.avatarSrc} width={30} />
        </HeaderButton>
        <div className="options">
          {state.showOptions ? (
            <UserMenuOptions
              locale={props.locale}
              onClose={toggleShowOptions}
              profileSlug={props.profileSlug}
            />) : null}
        </div>
        { /* language=CSS */ }
        <style jsx>{`
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
      {isAdmin ? <AdminMenuLink locale={locale} /> : null}
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
            margin-right: ${SPACING.M};
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

export function Header({ avatarSrc, avatarAlt, children, locale, profileSlug }: {
  avatarSrc?: string, avatarAlt?: string, children?: React.Node, locale: string, profileSlug?: string,
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
      {avatarSrc ? (
        <AvatarMenuLink
          avatarAlt={avatarAlt}
          avatarSrc={avatarSrc}
          locale={locale}
          profileSlug={profileSlug}
        />) : null}
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
              padding: 0 ${SPACING.M};
            }
          }
        `}
      </style>
    </div>
  );
}
