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

function AdminMenuLinks({ locale }: { locale: string }) {
  const text = i18n[locale];

  return (
    <React.Fragment>
      <ModalMenuLink href={URI.accounts}>{text.accounts}</ModalMenuLink>
      <ModalMenuLink href={URI.adminUsers}>{text.users}</ModalMenuLink>
      <ModalMenuLink href={URI.adminInvoice}>{text.invoicing}</ModalMenuLink>
      <ModalMenuLink href={URI.adminStats}>{text.stats}</ModalMenuLink>
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

function UserMenuLinks({ locale }: { locale: string }) {
  const text = i18n[locale];

  return (
    <React.Fragment>
      <ModalMenuLink href={URI.yourProfile}>{text.profile}</ModalMenuLink>
      <ModalMenuLink href={URI.logout}>{text.logout}</ModalMenuLink>
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

function HostingMenuMobile({ isAdmin, locale, onClick, profileName, profileSlug }: {
  isAdmin: boolean, locale: string, onClick: () => void, profileName?: string, profileSlug?: string,
}) {
  const text = i18n[locale];

  return (
    <React.Fragment>
      {profileName && profileSlug ? (
        <ModalMenuLink href={URI.accounts}>{`${text.selectedAccount} ${profileName}`}</ModalMenuLink>
      ) : null}
      <ModalMenuLink href={URI.inbox}>{text.inbox}</ModalMenuLink>
      <ModalMenuLink href={profileSlug ? `/manage-account/${profileSlug}/venues` : URI.hostVenues}>
        {text.venues}
      </ModalMenuLink>
      {isAdmin ? <AdminMenuLinks locale={locale} /> : null}
      <UserMenuLinks locale={locale} />
    </React.Fragment>
  );
}

export function HeaderHostingMenu({ isAdmin, locale, profileName, profileSlug }: {
  isAdmin: boolean, locale: 'nb' | 'en', profileName?: string, profileSlug?: string,
}) {
  const text = i18n[locale];

  return (
    <div className="main">
      <div className="mobile">
        <HeaderButtonMenu buttonChild={text.menu} hasArrow>
          <HostingMenuMobile
            isAdmin={isAdmin}
            locale={locale}
            profileSlug={profileSlug}
            profileName={profileName}
          />
        </HeaderButtonMenu>
      </div>
      <div className="desktop">
        <HeaderLink href={URI.inbox}>{text.inbox}</HeaderLink>
        <HeaderLink href={profileSlug ? `/manage-account/${profileSlug}/venues` : URI.hostVenues}>
          {text.venues}
        </HeaderLink>
        <HeaderLink href={profileSlug ? `/manage-account/${profileSlug}` : URI.accounts}>
          {text.account}
        </HeaderLink>
        {isAdmin ? <AdminMenu locale={locale} /> : null}
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
};

function WebMenuMobile({ isAdmin, isHost, isLoggedIn, locale, onClick }: {
  isAdmin: boolean, isHost: boolean, isLoggedIn: boolean, locale: string, onClick: () => void,
}) {
  const text = i18n[locale];

  return (
    <React.Fragment>
      {isHost ?
        null
        : <ModalMenuLink href={URI.becomeHost[locale]}>{text.becomeHost}</ModalMenuLink>}
      <ModalMenuLink href={URI.favorites[locale]}>{text.favorites}</ModalMenuLink>
      {isLoggedIn ? <ModalMenuLink href={URI.inbox}>{text.inbox}</ModalMenuLink> : null}
      <ModalMenuLink href={URI.help}>{text.help}</ModalMenuLink>
      {!isLoggedIn ? <ModalMenuLink href={URI.login} onClick={onLoginClick}>{text.login}</ModalMenuLink> : null}
      {isAdmin ? <AdminMenu locale={locale} /> : null}
      {isLoggedIn ? <UserMenuLinks locale={locale} /> : null}
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
