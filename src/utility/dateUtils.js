function isPastOrToday(value) {
  const dateToCheck = value && typeof value.toDate === 'function'
    ? value.toDate()
    : new Date(value);

  if (Number.isNaN(dateToCheck.getTime())) {
    throw new TypeError('Invalid expiry date.');
  }

  const indiaDateFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const getIndiaDateAsUtc = (date) => {
    const parts = indiaDateFormatter.formatToParts(date);
    const dateValues = Object.fromEntries(
      parts
        .filter(({ type }) => type !== 'literal')
        .map(({ type, value: partValue }) => [type, Number(partValue)])
    );

    // Convert the Indian calendar date to a UTC date at midnight.
    return new Date(Date.UTC(
      dateValues.year,
      dateValues.month - 1,
      dateValues.day
    ));
  };

  const expiryDateAsUtc = getIndiaDateAsUtc(dateToCheck);
  const todayDateAsUtc = getIndiaDateAsUtc(new Date());

  console.log(expiryDateAsUtc.getTime(), todayDateAsUtc.getTime())
console.log(expiryDateAsUtc, todayDateAsUtc)

  return expiryDateAsUtc.getTime() >= todayDateAsUtc.getTime();
}

module.exports = { isPastOrToday };