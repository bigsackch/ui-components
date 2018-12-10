// @flow
import * as React from 'react';
import dateformat from 'dateformat';

import { COLORS, FONT_SIZES } from './constants';

type EventDateButtonProps = {
  date: ?string,
  label?: string,
  locale: string,
  onClick: Function,
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

export function DateSelectButton({ date, label, locale, onClick }: EventDateButtonProps) {
  const text = i18n[locale];

  dateformat.masks.shortDate = text.shortDateFormatMask;

  return (
    <div>
      <label className="strong">
        {label}
        <button onClick={onClick} type="button">
          {date ? (
            <span>
              {dateformat(new Date(date), 'shortDate')}
            </span>
          ) : (
            <span className="choose-date">
              {text.chooseDate}
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
            background-color: #fff;
            border: 1px solid #aaa;
            border-radius: 2px;
            height: 50px;
            padding: 10px;
            cursor: pointer;
            width: 100%;
            text-align: left;
          }
          label {
            font-size: ${FONT_SIZES.S}
          }
        `}
      </style>
    </div>
  );
}
