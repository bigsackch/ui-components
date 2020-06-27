// @flow
/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import times from 'lodash/times';

import { Backdrop } from './Backdrop';
import { Grid } from './Grid';
import { Updating } from './Updating';

import iconLeft from '../static/images/icons/Left-Line-Black-24.svg';
import iconRight from '../static/images/icons/Right-Line-Black-24.svg';

const AVAILABILITY_STATUSES = {
  unknown: 'unknown',
  available: 'available',
  unavailable: 'unavailable',
};

type AvailabilityStatus = $Keys<typeof AVAILABILITY_STATUSES>;

type Availability = {
  date: ?string,
  sorting: ?number,
  status: ?AvailabilityStatus,
  week: ?number,
}

type DayProps = {
  day: Availability,
  onDateClick: (string) => void,
  selectedDate: ?string,
}

type WeekType = {
  days: Availability[],
  week: string,
}

const i18n = {
  nb: {
    days: [
      'Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør',
      'Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag',
    ],
    loading: 'Laster...',
  },
  en: {
    days: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    ],
    loading: 'Loading...',
  },
};

function dayNameOffset(locale: string) {
  switch (locale) {
    case 'nb':
      return 1;
    default:
      return 0;
  }
}

function dayNameShort({ dayOfWeek, envLocale, langLocale }: {
  dayOfWeek: number, envLocale: string, langLocale: string,
}) {
  return i18n[langLocale].days[(dayOfWeek + dayNameOffset(envLocale)) % 7].slice(0, 2);
}

function Day({ day, onDateClick, selectedDate }: DayProps) {
  const isSelected = selectedDate === day.date;

  return (
    <div
      className={`${day.status || ''}${isSelected ? ' selected' : ''}`}
      onClick={() => {
        if (day.status !== 'unavailable' && day.date) {
          onDateClick(day.date);
        }
      }}
    >
      {day.date ? (
        <span>
          {parseInt(day.date.slice(-2), 10)}
        </span>
      ) : null}
      { /* language=CSS */ }
      <style jsx>
        {`
        div {
          width: 45px;
          height: 45px;
          border: 1px solid #ebe8e3;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: -1px 0 0 -1px;
        }
        .available,
        .unknown {
          cursor: pointer;
        }
        .available:hover,
        .unknown:hover,
        .selected {
          background-color: #019288;
          color: #fff;
        }
        .unavailable {
          color: #ebe8e3;
          text-decoration: line-through;
        }
      `}
      </style>
    </div>
  );
}

type WeekProps = {
  days: Availability[],
  minDate: ?string,
  onDateClick: (string) => void,
  selectedDate: ?string,
  isDateAvailable: ?(string) => boolean,
}

function Week({ days, minDate, onDateClick, selectedDate, isDateAvailable }: WeekProps) {
  return (
    <Grid type="xs">
      {days.map(day => {
        const notWithinMinDate = !minDate || day.date < minDate;
        const isAvailable = !isDateAvailable || isDateAvailable(day.date);
        const status = isAvailable && notWithinMinDate ? day.status : 'unavailable';

        return (
          <Day
            day={Object.assign({}, day, { status })}
            key={day.date}
            onDateClick={onDateClick}
            selectedDate={selectedDate}
          />
        )
      })}
    </Grid>
  );
}

function WeekDayLabels({ envLocale, langLocale }: { envLocale: string, langLocale: string }) {
  const i18nDay = dayOfWeek => dayNameShort({ dayOfWeek, envLocale, langLocale });

  return (
    <Grid type="xs">
      {times(7, j => (
        <div key={j}>
          {i18nDay(j)}
        </div>
      ))}
      { /* language=CSS */ }
      <style jsx>
        {`
        div {
          width: 45px;
          height: 45px;
          border: 1px solid transparent;
          color: #929292;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: -1px 0 0 -1px;
          text-transform: lowercase;
        }
      `}
      </style>
    </Grid>
  );
}

type NavigationProps = {
  children: React.Node,
  onPrevMonthClick: () => void,
  onNextMonthClick: () => void,
}

function Navigation({ children, onPrevMonthClick, onNextMonthClick }: NavigationProps) {
  return (
    <div className="main mbm">
      <button
        className="prev"
        onClick={onPrevMonthClick}
        type="button"
      >
        <img alt="" src={iconLeft} />
      </button>
      <div className="child">
        {children}
      </div>
      <button
        className="next"
        onClick={onNextMonthClick}
        type="button"
      >
        <img alt="" src={iconRight} />
      </button>
      { /* language=CSS */ }
      <style jsx>
        {`
        img {
          width: 20px;
        }
        button {
          background-color: transparent;
          border: 1px solid #ebe8e3;
          width: 45px;
          height: 35px;
          border-radius: 2px;
          font-size: 1.9rem;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        button:hover {
          border-color: rgb(75, 75, 75);
        }
        .main {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2.1rem;
        }
        .prev {
          margin-right: auto;
        }
        .next {
          margin-left: auto;
        }
        .child {
          margin: 0 auto;
        }
      `}
      </style>
    </div>
  );
}

function Label({ children }: { children: React.Node }) {
  return (
    <div>
      <strong>
        {children}
      </strong>
      { /* language=CSS */ }
      <style jsx>
        {`
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2.1rem;
        }
      `}
      </style>
    </div>
  );
}

type DatePickerProps = {
  envLocale: string,
  isLoading: boolean,
  label: string,
  langLocale: string,
  minDate: ?string,
  onClose: () => void,
  onDateClick: (string) => void,
  onNextMonthClick: () => void,
  onPrevMonthClick: () => void,
  selectedDate: ?string,
  weeks: ?WeekType[],
  isDateAvailable: ?(string) => boolean,
}

export function DatePicker({
  envLocale,
  isLoading,
  label,
  langLocale,
  minDate,
  onClose,
  onDateClick,
  onNextMonthClick,
  onPrevMonthClick,
  selectedDate,
  weeks,
  isDateAvailable
}: DatePickerProps) {
  const text = i18n[langLocale];

  return (
    <div>
      <Backdrop onClick={onClose} />
      <div className="main">
        <div className="inner">
          <Navigation
            onPrevMonthClick={onPrevMonthClick}
            onNextMonthClick={onNextMonthClick}
          >
            <Label>
              {label}
            </Label>
          </Navigation>
          {weeks
            ? (
              <div className="cal">
                {isLoading ? <Updating /> : null}
                <WeekDayLabels envLocale={envLocale} langLocale={langLocale} />
                {weeks.map(week => (
                  <Week
                    days={week.days}
                    key={week.days[0].date}
                    minDate={minDate}
                    onDateClick={onDateClick}
                    selectedDate={selectedDate}
                    isDateAvailable={isDateAvailable}
                  />
                ))}
              </div>
            ) : (
              <div>
                {text['loading']}
              </div>
            )
          }
        </div>
      </div>
      { /* language=CSS */ }
      <style jsx>
        {`
        .main {
          margin-top: -20px;
          margin-left: 20px;
          position: absolute;
          z-index: 100000;
          background-color: #fff;
          border: 1px solid #ebe8e3;
          border-radius: 3px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }
        .inner {
          position: relative;
          top: 1px;
          left: 1px;
          width: 308px;
          margin: 20px;
        }
        .cal {
          position: relative;
        }
      `}
      </style>
    </div>
  );
}
