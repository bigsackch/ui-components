// @flow
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { Backdrop } from './Backdrop';

import { LOCALES } from './constants';

import iconArrowDown from '../static/images/icons/Arrow-Down-Line-Black-24.svg';

const i18n = {
  nb: {
    chooseLang: 'Velg språk',
    en: 'Engelsk',
    nb: 'Norsk',
  },
  en: {
    chooseLang: 'Choose language',
    en: 'English',
    nb: 'Norwegian',
  }
};

type ButtonProps = {
  children: React.Node,
  className: string,
  onClick: () => void,
}

function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`text-s ${className}`}
      onClick={onClick}
      type="button"
    >
      {children}
      { /* language=CSS */ }
      <style jsx>
        {`
        button {
          border: 0;
          background-color: transparent;
          cursor: pointer;
          outline: 0;
        }
      `}
      </style>
    </button>
  );
}

type CurrentLocaleProps = {
  locale: string,
  isArrowUp: boolean,
  onClick: () => void,
}

function CurrentLocale({
  locale, isArrowUp, onClick,
}: CurrentLocaleProps) {
  const text = i18n[locale];

  return (
    <div className="mam">
      <Button className="strong" onClick={onClick}>
        {text[locale]}
        <img
          alt=""
          src={iconArrowDown}
          width="10"
          style={{ transform: isArrowUp ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </Button>
      { /* language=CSS */ }
      <style jsx>
        {`
        img {
          margin-left: 6px;
          transition-duration: 250ms;
          transition-timing-function: ease-in-out;
        }
      `}
      </style>
    </div>
  );
}

type OptionProps = {
  children: React.Node,
  isSelected: boolean,
  locale: string,
  onClick: (locale: string) => void,
}

function Option({
  locale, onClick, isSelected, children,
}: OptionProps) {
  return (
    <li onClick={() => onClick(locale)} className={isSelected ? 'strong' : ''}>
      {children}
      { /* language=CSS */ }
      <style jsx>
        {`
          li {
            cursor: pointer;
            padding: 8px 20px;
          }
          li:hover {
            background-color: #ccc;
          }
        `}
      </style>
    </li>
  );
}

function Options({ locale, onClick }: { locale: string, onClick: (locale: string) => void }) {
  const text = i18n[locale];

  return (
    <div className="text-m">
      <h4 className="strong">
        {text.chooseLang}
      </h4>
      <hr className="man" />
      <ul>
        <Option locale={LOCALES.en} isSelected={locale === LOCALES.en} onClick={onClick}>{text[LOCALES.en]}</Option>
        <Option locale={LOCALES.nb} isSelected={locale === LOCALES.nb} onClick={onClick}>{text[LOCALES.nb]}</Option>
      </ul>
      { /* language=CSS */ }
      <style jsx>
        {`
        div {
          bottom: 23px;
          position: absolute;
          right: 20px;
          z-index: 1010;
          background-color: #fff;
          border: 1px solid #ebe8e3;
          border-radius: 3px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          text-align: left;
          min-width: 150px;
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

type LocaleSelectorProps = {
  locale: string,
  onHideLocales: () => void,
  onLocaleSelect: (string) => void,
  onShowLocales: () => void,
  showLocaleOptions: boolean,
}

export function LocaleSelector({
  locale,
  onLocaleSelect,
  onShowLocales,
  onHideLocales,
  showLocaleOptions,
}: LocaleSelectorProps) {
  return (
    <div style={{ position: 'relative' }}>
      <CurrentLocale
        locale={locale}
        isArrowUp={showLocaleOptions}
        onClick={onShowLocales}
      />
      {showLocaleOptions ? (
        <div>
          <Backdrop onClick={onHideLocales} />
          <Options
            locale={locale}
            onClick={(selectedLocale) => {
              onLocaleSelect(selectedLocale);
            }}
          />
        </div>) : null}
    </div>
  );
}

export class LocaleSelectorWithState extends React.Component<
  { locale: string, onSelect: (string) => void }, { showOptions: boolean }
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
      <LocaleSelector
        locale={props.locale}
        onHideLocales={toggleShowOptions}
        onLocaleSelect={selectedLocale => {
          toggleShowOptions();
          props.onSelect(selectedLocale);
        }}
        onShowLocales={toggleShowOptions}
        showLocaleOptions={state.showOptions}
      />
    );
  }
}
