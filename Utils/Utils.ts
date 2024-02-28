export const getRandomEntries = <T>(array: GameGenre[]): Genre[] => {
  let originalArray = array;

  for (let i = originalArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [originalArray[i], originalArray[j]] = [originalArray[j], originalArray[i]];
  }

  const resultArray = originalArray
    .slice(0,3)
    .sort((a, b) => a.id - b.id)
  
  return resultArray
}

export const formatSupabaseDateTime = (date: Date|number) => {
  let dateToFormat

  if (typeof date === 'number') {
    dateToFormat = new Date(date)
  } else {
    dateToFormat = date as Date
  }

  const year = dateToFormat.getFullYear();
  const month = String(dateToFormat.getMonth() + 1).padStart(2, '0');
  const day = String(dateToFormat.getDate()).padStart(2, '0');
  const hours = String(dateToFormat.getHours()).padStart(2, '0');
  const minutes = String(dateToFormat.getMinutes()).padStart(2, '0');
  const seconds = String(dateToFormat.getSeconds()).padStart(2, '0');
  const milliseconds = String(dateToFormat.getMilliseconds()).padStart(3, '0');
  const timezoneOffset = dateToFormat.getTimezoneOffset();
  const timezoneOffsetSign = timezoneOffset > 0 ? '-' : '+';
  const timezoneOffsetHours = String(Math.abs(Math.floor(timezoneOffset / 60))).padStart(2, '0');
  const timezoneOffsetMinutes = String(Math.abs(timezoneOffset % 60)).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffsetSign}${timezoneOffsetHours}${timezoneOffsetMinutes}`;
}