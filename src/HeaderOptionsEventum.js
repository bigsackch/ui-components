// @flow
import * as React from 'react';

import { Avatar } from './Avatar';
import {
  HeaderButtonMenu,
  HeaderLink,
  ModalMenuLink,
} from './Header';

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
    users: 'Brukere',
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
    en: '/list-your-space',
    nb: '/leie-ut-lokale',
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

function returnUrl(): string {
  const currentHref = window.location.href;
  return encodeURIComponent(currentHref.replace(window.location.origin, ''));
}

export function onLoginClick(event: SyntheticEvent<>): void {
  event.preventDefault();
  window.location.href = `${URI.login}?returnUrl=${returnUrl()}`;
}

function AdminMenuLinks({ locale, onClick }: { locale: string, onClick?: () => void }) {
  const text = i18n[locale];

  return (
    <React.Fragment>
      <ModalMenuLink href={URI.accounts} onClick={onClick}>{text.accounts}</ModalMenuLink>
      <ModalMenuLink href={URI.adminUsers} onClick={onClick}>{text.users}</ModalMenuLink>
      <ModalMenuLink href={URI.adminInvoice} onClick={onClick}>{text.invoicing}</ModalMenuLink>
      <ModalMenuLink href={URI.adminStats} onClick={onClick}>{text.stats}</ModalMenuLink>
    </React.Fragment>
  )
}

function AdminMenu({ locale }: { locale: string }) {
  const text = i18n[locale];

  return (
    <HeaderButtonMenu buttonChild={text.admin}>
      <AdminMenuLinks locale={locale} />
    </HeaderButtonMenu>
  );
}

function HostMenu({ locale }: { locale: string }) {
  const text = i18n[locale];

  return (
    <HeaderButtonMenu buttonChild={text.host}>
      <ModalMenuLink href={URI.accounts}>{text.account}</ModalMenuLink>
      <ModalMenuLink href={URI.hostVenues}>{text.venues}</ModalMenuLink>
    </HeaderButtonMenu>
  );
}

function UserMenuLinks({ locale, onClick }: { locale: string, onClick?: () => void }) {
  const text = i18n[locale];

  return (
    <React.Fragment>
      <ModalMenuLink href={URI.yourProfile} onClick={onClick}>{text.profile}</ModalMenuLink>
      <ModalMenuLink href={URI.logout} onClick={onClick}>{text.logout}</ModalMenuLink>
    </React.Fragment>
  )
}

export function AvatarMenu({ avatarAlt, avatarSrc, locale }: { avatarAlt?: string, avatarSrc: string, locale: string }) {
  const avatar = <Avatar altPart={avatarAlt} src={avatarSrc} width={30} />;

  return (
    <HeaderButtonMenu buttonChild={avatar}>
      <UserMenuLinks locale={locale} />
    </HeaderButtonMenu>
  );
}

function HostingMenuMobile({ isAdmin, locale, onClick, accountName, accountSlug }: {
  isAdmin: boolean, locale: string, onClick?: () => void, accountName?: string, accountSlug?: string,
}) {
  const text = i18n[locale];

  return (
    <React.Fragment>
      {accountName && accountSlug ? (
        <ModalMenuLink href={URI.accounts} onClick={onClick}>{`${text.selectedAccount} ${accountName}`}</ModalMenuLink>
      ) : null}
      <ModalMenuLink href={URI.inbox} onClick={onClick}>{text.inbox}</ModalMenuLink>
      <ModalMenuLink href={accountSlug ? `/manage-account/${accountSlug}/venues` : URI.hostVenues} onClick={onClick}>
        {text.venues}
      </ModalMenuLink>
      {isAdmin ? <AdminMenuLinks locale={locale} onClick={onClick} /> : null}
      <UserMenuLinks locale={locale} onClick={onClick} />
    </React.Fragment>
  );
}

export function HeaderHostingMenu({ isAdmin, locale, accountName, accountSlug }: {
  isAdmin: boolean, locale: 'nb' | 'en', accountName?: string, accountSlug?: string,
}) {
  const text = i18n[locale];

  return (
    <div className="main">
      <div className="mobile">
        <HeaderButtonMenu buttonChild={text.menu} hasArrow>
          <HostingMenuMobile
            isAdmin={isAdmin}
            locale={locale}
            accountSlug={accountSlug}
            accountName={accountName}
          />
        </HeaderButtonMenu>
      </div>
      <div className="desktop">
        <HeaderLink href={URI.inbox}>{text.inbox}</HeaderLink>
        <HeaderLink href={accountSlug ? `/manage-account/${accountSlug}/venues` : URI.hostVenues}>
          {text.venues}
        </HeaderLink>
        <HeaderLink href={accountSlug ? `/manage-account/${accountSlug}` : URI.accounts}>
          {text.account}
        </HeaderLink>
        {isAdmin ? <AdminMenu locale={locale} /> : null}
        {accountSlug && accountName ? (
          <div className="account">
            <div>{text.selectedAccount}</div>
            <HeaderLink href={URI.accounts}>{accountName}</HeaderLink>
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
          @media only screen and (min-width: 1024px) {
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
};

function WebMenuMobile({ isAdmin, isHost, isLoggedIn, locale, onClick }: {
  isAdmin: boolean, isHost: boolean, isLoggedIn: boolean, locale: string, onClick?: () => void,
}) {
  const text = i18n[locale];

  return (
    <React.Fragment>
      {isHost ?
        null
        : <ModalMenuLink href={URI.becomeHost[locale]} onClick={onClick}>{text.becomeHost}</ModalMenuLink>}
      <ModalMenuLink href={URI.favorites[locale]} onClick={onClick}>{text.favorites}</ModalMenuLink>
      {isLoggedIn ? <ModalMenuLink href={URI.inbox} onClick={onClick}>{text.inbox}</ModalMenuLink> : null}
      <ModalMenuLink href={URI.help} onClick={onClick}>{text.help}</ModalMenuLink>
      {!isLoggedIn ? <ModalMenuLink href={URI.login} onClick={onLoginClick}>{text.login}</ModalMenuLink> : null}
      {isAdmin ? <AdminMenuLinks locale={locale} onClick={onClick} /> : null}
      {isLoggedIn ? <UserMenuLinks locale={locale} onClick={onClick} /> : null}
    </React.Fragment>
  );
}

export function HeaderWebMenu({
  isAdmin, isHost, locale, isLoggedIn,
}: { isAdmin: boolean, isHost: boolean, isLoggedIn: boolean, locale: string }) {
  const text = i18n[locale];

  return (
    <div>
      <div className="mobile">
        <HeaderButtonMenu buttonChild={text.menu} hasArrow>
          <WebMenuMobile
            isAdmin={isAdmin}
            isHost={isHost}
            isLoggedIn={isLoggedIn}
            locale={locale}
          />
        </HeaderButtonMenu>
      </div>

      <div className="desktop">
        {isHost ?
          <HostMenu locale={locale} />
          : <HeaderLink href={URI.becomeHost[locale]}>{text.becomeHost}</HeaderLink>}
        <HeaderLink href={URI.favorites[locale]}>{text.favorites}</HeaderLink>
        {isLoggedIn ? <HeaderLink href={URI.inbox}>{text.inbox}</HeaderLink> : null}
        <HeaderLink href={URI.help}>{text.help}</HeaderLink>
        {isAdmin ? <AdminMenu locale={locale} /> : null}
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
