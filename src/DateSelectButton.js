// @flow
import * as React from 'react';
import dateformat from 'dateformat';

import { COLORS, FONT_SIZES, SPACING } from './constants';

import calendar from '../static/images/icons/Calendar-4-Line-Black-24-Custom.svg';

type EventDateButtonProps = {
  date: ?string,
  label?: string,
  locale: string,
  onClick: Function,
  wrapperClass?: string,
  wrapperStyle?: Object,
  placeholder?: string,
}

const i18n = {
  nb: {
    chooseDate: 'Velg dato',
    shortDateFormatMask: 'dd.mm.yyyy',
  },
  en: {
    chooseDate: 'Choose date',
    shortDateFormatMask: 'mm/dd/yyyy',
  }
};

export function DateSelectButton({ date, label, locale, onClick, wrapperClass, wrapperStyle, placeholder }: EventDateButtonProps) {
  const text = i18n[locale];

  dateformat.masks.shortDate = text.shortDateFormatMask;

  return (
    <div classname={wrapperClass} style={wrapperStyle}>
      <label className="strong">
        {label}
        <button onClick={onClick} type="button">
          <img alt="" height="24" src={calendar} />
          {date ? (
            <span>
              {dateformat(new Date(date), 'shortDate')}
            </span>
          ) : (
            <span className="choose-date">
              {placeholder || text.chooseDate}
            </span>
          )}
        </button>
      </label>
      { /* language=CSS */}
      <style jsx>
        {`
          .choose-date {
            color: ${COLORS.SUBTLE};
          }
          button {
            align-items: center;
            background-color: #fff;
            border: 1px solid #aaa;
            border-radius: 2px;
            display: flex;
            height: 50px;
            padding: ${SPACING.S};
            cursor: pointer;
            width: 100%;
            text-align: left;
          }
          img {
            margin-right: ${SPACING.S};
          }
          label {
            font-size: ${FONT_SIZES.S};
          }
        `}
      </style>
    </div>
  );
}
