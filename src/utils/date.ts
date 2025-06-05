import * as moment from 'moment';

interface DateOptions {
  includeTime?: boolean;
}

export const dateToString = (date: Date, option?: DateOptions) => {
  let format = 'DD-MM-YYYY';
  if (option?.includeTime) format += ' HH:mm:ss';

  return moment(date).format(format);
};