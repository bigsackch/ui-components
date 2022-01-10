// @flow
import * as React from 'react';

import { Avatar } from './Avatar';
import { COLORS } from './constants';
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
    host: 'Utleier',
    inbox: 'Meldinger',
    performInvoicing: 'Fakturering',
    adminTransferVenues: 'Overfør lokaler',
    login: 'Logg inn',
    logout: 'Logg ut',
    menu: 'Meny',
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
    performInvoicing: 'Invoicing',
    adminTransferVenues: 'Transfer venues',
    login: 'Login',
    logout: 'Log out',
    menu: 'Menu',
    selectAccount: 'Choose account',
    selectedAccount: 'You manage:',
    stats: 'Stats dashboard',
    users: 'User profiles',
    venues: 'Venues',
  },
};

const URI = {
  accounts: '/hosting/accounts',
  adminPerformInvoicing: '/hosting/accounting/invoicing',
  adminTransferVenues: '/hosting/venue-transfer',
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
  inbox: '/inbox/',
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
      <ModalMenuLink href={URI.adminPerformInvoicing} onClick={onClick}>{text.performInvoicing}</ModalMenuLink>
      <ModalMenuLink href={URI.adminTransferVenues} onClick={onClick}>{text. adminTransferVenues}</ModalMenuLink>
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

type HeaderHostingMenuProps = {
  accountName?: string,
  accountSlug?: string,
  hideAccountSelect?: boolean,
  inboxUntreatedCount?: number,
  inboxUri?: string,
  isAdmin: boolean,
  locale: 'nb' | 'en',
}

type HostingMenuMobileProps = {
  accountName?: string,
  accountSlug?: string,
  inboxUntreatedCount?: number,
  inboxUri?: string,
  isAdmin: boolean,
  locale: 'nb' | 'en',
  onClick?: () => void,
}

function HostingMenuMobile({
  accountName,
  accountSlug,
  inboxUntreatedCount,
  inboxUri,
  isAdmin,
  locale,
  onClick,
}: HostingMenuMobileProps) {
  const text = i18n[locale];
  const untreatedColor = inboxUntreatedCount && inboxUntreatedCount > 0 ? COLORS.ERROR : 'green';

  return (
    <React.Fragment>
      {accountName && accountSlug ? (
        <ModalMenuLink href={URI.accounts} onClick={onClick}>{`${text.selectedAccount} ${accountName}`}</ModalMenuLink>
      ) : null}
      <ModalMenuLink href={inboxUri || URI.inbox} onClick={onClick}>
        <span>{text.inbox}</span>
        {inboxUntreatedCount ? <span style={{ color: untreatedColor }}> ({inboxUntreatedCount})</span> : null}
      </ModalMenuLink>
      <ModalMenuLink href={accountSlug ? `/manage-account/${accountSlug}/venues` : URI.hostVenues} onClick={onClick}>
        {text.venues}
      </ModalMenuLink>
      <ModalMenuLink href={accountSlug ? `/manage-account/${accountSlug}` : URI.accounts} onClick={onClick}>
        {text.account}
      </ModalMenuLink>
      {isAdmin ? <AdminMenuLinks locale={locale} onClick={onClick} /> : null}
      <UserMenuLinks locale={locale} onClick={onClick} />
    </React.Fragment>
  );
}

export function HeaderHostingMenu({
  accountName,
  accountSlug,
  hideAccountSelect,
  inboxUntreatedCount,
  inboxUri,
  isAdmin,
  locale,
}: HeaderHostingMenuProps) {
  const text = i18n[locale];
  const untreatedColor = inboxUntreatedCount && inboxUntreatedCount > 0 ? COLORS.ERROR : 'green';

  return (
    <div className="main">
      <div className="mobile">
        <HeaderButtonMenu buttonChild={text.menu} hasArrow>
          <HostingMenuMobile
            accountName={accountName}
            accountSlug={accountSlug}
            inboxUntreatedCount={inboxUntreatedCount}
            inboxUri={inboxUri}
            isAdmin={isAdmin}
            locale={locale}
          />
        </HeaderButtonMenu>
      </div>
      <div className="desktop">
        <HeaderLink href={inboxUri || URI.inbox}>
          <span>{text.inbox}</span>
          {inboxUntreatedCount ? <span style={{ color: untreatedColor }}> ({inboxUntreatedCount})</span> : null}
        </HeaderLink>
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
            {!hideAccountSelect ? <HeaderLink href={URI.accounts}>{text.selectAccount}</HeaderLink> : null}
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
