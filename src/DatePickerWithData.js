import * as React from 'react';
import _map from 'lodash/fp/map';
import chunk from 'lodash/fp/chunk';
import dateformat from 'dateformat';
import flow from 'lodash/fp/flow';

import { DatePicker } from './DatePicker';

const map = _map.convert({ cap: false });

function monday(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
}

function sunday(date) {
  const day = date.getDay();
  const diff = date.getDate() + (7 - day);
  return new Date(date.setDate(diff));
}

const lastDate = (year, month) => new Date(year, month + 1, 0);

function dateRange(start, end) {
  let arr = [];
  for(const dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push({ date: dateformat(dt, 'yyyy-mm-dd'), status: 'unknown' });
  }
  return arr;
}

function toWeeks(availability) {
  return flow(
    chunk(7),
    map(days => ({ days })),
  )(availability);
}

function nextMonth(date: Date): Date {
  return new Date(date.setMonth(date.getMonth() + 1));
}

function prevMonth(date: Date): Date {
  return new Date(date.setMonth(date.getMonth() - 1));
}

function monthLabel(date: Date): string {
  return `${dateformat.i18n.monthNames[date.getMonth() + 12]} ${date.getFullYear()}`;
}

type Props = {
  initialDate: ?string,
  selectedDate: ?string,
  minDate?: string,
  onDateClick: () => void,
  onClose: () => void,
}

type State = {
  calendarMonthDate: Date,
}

export class DatePickerWithData extends React.Component<Props, State> {
  state = {
    calendarMonthDate: this.props.initialDate ? new Date(this.props.initialDate) : new Date(),
  };

  onNextMonthClick = () => this.setState(prevState => ({ calendarMonthDate: nextMonth(prevState.calendarMonthDate) }));

  onPrevMonthClick = () => this.setState(prevState => ({ calendarMonthDate: prevMonth(prevState.calendarMonthDate) }));

  render() {
    const { selectedDate, minDate, onClose, onDateClick } = this.props;
    const { calendarMonthDate } = this.state;
    const year = calendarMonthDate.getFullYear();
    const month = calendarMonthDate.getMonth();
    const weeks = toWeeks(dateRange(monday(new Date(year, month)), sunday(lastDate(year, month))));

    return (
      <DatePicker
        envLocale="nb"
        langLocale="en"
        weeks={weeks}
        onNextMonthClick={this.onNextMonthClick}
        onPrevMonthClick={this.onPrevMonthClick}
        isLoading={false}
        label={monthLabel(calendarMonthDate)}
        onClose={onClose}
        onDateClick={(date) => {
          onDateClick(date)
        }}
        selectedDate={selectedDate}
        minDate={minDate}
      />
    );
  }
}
