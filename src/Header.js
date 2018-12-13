// @flow
import * as React from 'react';

import { Avatar } from './Avatar';
import { Button } from './Buttons';
import { ModalMenu } from './Modal';
import { COLORS, SPACING } from './constants';

import eventumSymbol from '../static/images/eventum-icon_usy2oo.svg';
import eventumLogo from '../static/images/eventum_logo_doja3b.svg';
import iconArrowDown from '../static/images/icons/Arrow-Down-Line-Black-24.svg';

const i18n = {
  nb: {
    account: 'Kontoinstillinger',
    accounts: 'Kontoer',
    admin: 'Admin',
    becomeHost: 'Bli en utleier',
    favorites: 'Favoritter',
    help: 'Hjelp',
    host: 'Utleier',
    inbox: 'Meldinger',
    invoicing: 'Fakturering',
    login: 'Logg inn',
    logout: 'Logg ut',
    menu: 'Meny',
    profile: 'Rediger profil',
    selectAccount: 'Velg konto',
    selectedAccount: 'Du administrerer:',
    stats: 'Statistikkpanel',
    users: 'Brukerprofiler',
    venues: 'Utleiesteder',
  },
  en: {
    account: 'Account settings',
    accounts: 'Accounts',
    admin: 'Admin',
    becomeHost: 'Become a host',
    favorites: 'Favorites',
    help: 'Help',
    host: 'Host',
    inbox: 'Messages',
    invoicing: 'Invoicing',
    login: 'Login',
    logout: 'Log out',
    menu: 'Menu',
    profile: 'Edit profile',
    selectAccount: 'Choose account',
    selectedAccount: 'You manage:',
    stats: 'Stats dashboard',
    users: 'User profiles',
    venues: 'Venues',
  },
};

const URI = {
  accounts: '/hosting/accounts',
  adminInvoice: '/inbox/admin/invoice',
  adminStats: '/inbox/admin/stats',
  adminUsers: '/inbox/admin/users',
  becomeHost: {
    en: '/become-a-host',
    nb: '/bli-en-utleier',
  },
  favorites: {
    en: '/favorites',
    nb: '/favoritter',
  },
  help: 'https://eventum.zendesk.com',
  hostVenues: '/hosting/venues',
  inbox: '/inbox',
  login: '/inbox/login',
  logout: '/inbox/logout',
  yourProfile: '/your-profile',
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

function MenuListLink({ children, href, onClick }: { children: React.Node, href: string, onClick?: () => void }) {
  return (
    <li>
      <a href={href} onClick={onClick}>{children}</a>
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
    <ul>
      <MenuListLink href={URI.accounts} onClick={onClose}>{text.accounts}</MenuListLink>
      <MenuListLink href={URI.adminUsers}>{text.users}</MenuListLink>
      <MenuListLink href={URI.adminInvoice}>{text.invoicing}</MenuListLink>
      <MenuListLink href={URI.adminStats}>{text.stats}</MenuListLink>
      { /* language=CSS */ }
      <style jsx>{`
        ul {
          margin-top: 0;
          margin-bottom: 0;
        }
      `}</style>
    </ul>
  );
}

function UserMenuOptions({ locale, onClose }: {
  locale: string, onClose: () => void,
}) {
  const text = i18n[locale];

  return (
    <ul>
      <MenuListLink href={URI.yourProfile} onClick={onClose}>{text.profile}</MenuListLink>
      <MenuListLink href={URI.logout} onClick={onClose}>{text.logout}</MenuListLink>
      { /* language=CSS */ }
      <style jsx>{`
        ul {
          margin-top: 0;
          margin-bottom: 0;
        }
      `}</style>
    </ul>
  );
}

function MobileHostingMenuOptions({ isAdmin, locale, onClose, profileName, profileSlug }: {
  isAdmin: boolean, locale: string, onClose: () => void, profileName?: string, profileSlug?: string,
}) {
  const text = i18n[locale];

  return (
    <div>
      <ul>
        {profileName && profileSlug ? (
          <MenuListLink
            href={URI.accounts}
            onClick={onClose}
          >{`${text.selectedAccount} ${profileName}`}</MenuListLink>
        ) : null}
        <MenuListLink href={URI.inbox} onClick={onClose}>{text.inbox}</MenuListLink>
        <MenuListLink
          href={profileSlug ? `/manage-account/${profileSlug}/venues` : URI.hostVenues}
          onClick={onClose}
        >{text.venues}</MenuListLink>
      </ul>
      {isAdmin ? <AdminMenuOptions locale={locale} onClose={onClose} /> : null}
      <UserMenuOptions
        locale={locale}
        onClose={onClose}
        profileSlug={profileSlug}
      />
      { /* language=CSS */ }
      <style jsx>{`
        ul {
          margin-top: 0;
          margin-bottom: 0;
        }
      `}</style>
    </div>
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
          {state.showOptions ? (
            <ModalMenu onClose={toggleShowOptions} topLock={70}>
              <AdminMenuOptions locale={props.locale} onClose={toggleShowOptions} />
            </ModalMenu>
          ): null}
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

export class AvatarMenuLink extends React.Component<
  { avatarAlt: ?string, avatarSrc: string, locale: string }, { showOptions: boolean }
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
            <ModalMenu onClose={toggleShowOptions} topLock={70}>
              <UserMenuOptions
                locale={props.locale}
                onClose={toggleShowOptions}
              />
            </ModalMenu>
          ) : null}
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
export class HeaderHostingMenuMobile extends React.Component<
  { isAdmin: boolean, locale: string, profileName?: string, profileSlug?: string }, { showOptions: boolean }
  > {
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
        <HeaderButton onClick={toggleShowOptions}>
          <span>{text.menu}</span>
          <img
            alt=""
            src={iconArrowDown}
            width="10"
            style={{ transform: state.showOptions ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </HeaderButton>
        <div className="options">
          {state.showOptions ? (
            <ModalMenu onClose={toggleShowOptions} topLock={70}>
              <MobileHostingMenuOptions
                isAdmin={props.isAdmin}
                locale={props.locale}
                onClose={toggleShowOptions}
                profileSlug={props.profileSlug}
                profileName={props.profileName}
              />
            </ModalMenu>
          ) : null}
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

function HostMenuOptions({ locale, onClose }: { locale: string, onClose: () => void }) {
  const text = i18n[locale];

  return (
    <ul>
      <MenuListLink href={URI.accounts} onClick={onClose}>{text.account}</MenuListLink>
      <MenuListLink href={URI.hostVenues} onClick={onClose}>{text.venues}</MenuListLink>
      { /* language=CSS */ }
      <style jsx>{`
        ul {
          margin-top: 0;
          margin-bottom: 0;
        }
      `}</style>
    </ul>
  );
}

export class HostMenuLink extends React.Component<{ locale: string }, { showOptions: boolean }> {
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
        <HeaderButton onClick={toggleShowOptions}>{text.host}</HeaderButton>
        <div className="options">
          {state.showOptions ? (
            <ModalMenu onClose={toggleShowOptions} topLock={70}>
              <HostMenuOptions locale={props.locale} onClose={toggleShowOptions} />
            </ModalMenu>
          ): null}
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

function returnUrl(): string {
  const currentHref = window.location.href;
  return encodeURIComponent(currentHref.replace(window.location.origin, ''));
}

export function onLoginClick(event: SyntheticEvent<>): void {
  event.preventDefault();
  window.location.href = `${URI.login}?returnUrl=${returnUrl()}`;
}

export function HeaderWebMenu({
  isAdmin, isHost, locale, isLoggedIn,
}: { isAdmin: boolean, isHost: boolean, isLoggedIn: boolean, locale: string }) {
  const text = i18n[locale];

  return (
    <div>
      {/*<div className="mobile">*/}
        {/*<HeaderWebMenuMobile*/}
          {/*isAdmin={isAdmin}*/}
          {/*locale={locale}*/}
          {/*profileName={profileName}*/}
          {/*profileSlug={profileSlug}*/}
        {/*/>*/}
      {/*</div>*/}
      <div className="desktop">
        {isHost ?
          <HostMenuLink locale={locale} />
          : <HeaderLink href={URI.becomeHost[locale]}>{text.becomeHost}</HeaderLink>}
        <HeaderLink href={URI.favorites[locale]}>{text.favorites}</HeaderLink>
        <HeaderLink href={URI.inbox}>{text.inbox}</HeaderLink>
        <HeaderLink href={URI.help}>{text.help}</HeaderLink>
        {isAdmin ? <AdminMenuLink locale={locale} /> : null}
        {!isLoggedIn ? <HeaderLink href={URI.login} onClick={onLoginClick}>{text.login}</HeaderLink> : null}
      </div>
      {/* language=CSS */}
      <style jsx>
        {`
          .desktop {
            display: none;
          }
          @media only screen and (min-width: 768px) {
            .desktop {
              align-items: center;
              display: flex;
              flex: 1 auto;
            }
            .mobile {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export function HeaderHostingMenu({ isAdmin, locale, profileName, profileSlug }: {
  isAdmin: boolean, locale: 'nb' | 'en', profileName?: string, profileSlug?: string,
}) {
  const text = i18n[locale];

  return (
    <div className="main">
      <div className="mobile">
        <HeaderHostingMenuMobile
          isAdmin={isAdmin}
          locale={locale}
          profileName={profileName}
          profileSlug={profileSlug}
        />
      </div>
      <div className="desktop">
        <HeaderLink href={URI.inbox}>{text.inbox}</HeaderLink>
        <HeaderLink href={profileSlug ? `/manage-account/${profileSlug}/venues` : URI.hostVenues}>
          {text.venues}
        </HeaderLink>
        <HeaderLink href={profileSlug ? `/manage-account/${profileSlug}` : URI.accounts}>
          {text.account}
        </HeaderLink>
        {isAdmin ? <AdminMenuLink locale={locale} /> : null}
        {profileSlug && profileName ? (
          <div className="account">
            <div>{text.selectedAccount}</div>
            <HeaderLink href={URI.accounts}>{profileName}</HeaderLink>
          </div>
        ) : (
          <div className="account">
            <HeaderLink href={URI.accounts}>{text.selectAccount}</HeaderLink>
          </div>
        )}
      </div>
      {/* language=CSS */}
      <style jsx>
        {`
          .main {
            flex: 1 auto;
          }
          .account {
            display: flex;
            margin-left: auto;
          }
          .desktop {
            display: none;
          }
          @media only screen and (min-width: 768px) {
            .desktop {
              align-items: center;
              display: flex;
              flex: 1 auto;
            }
            .mobile {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}
HeaderHostingMenu.defaultValue = {
  isAdmin: false,
  locale: 'nb',
};

export function Header({ avatarSrc, avatarAlt, children, locale }: {
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
