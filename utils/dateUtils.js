const moment = require('moment');

export const dateStamp = date => moment(date).format('DD-DD-YY');
