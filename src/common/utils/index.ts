import monent from 'moment';

const currentYear = monent().year();

export const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) =>
  (2015 + i).toString(),
);
