function isPastOrToday(value) {
  const dateToCheck = value && typeof value.toDate === 'function'
    ? value.toDate()
    : new Date(value);
  const today = new Date();

  dateToCheck.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return today.getTime() <= dateToCheck.getTime();
}

module.exports = { isPastOrToday };