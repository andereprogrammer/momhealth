export function formatDate(dateStr: string): {
  dayOfWeek: string;
  formattedDate: string;
} {
  const [day, month, year] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const dayOfWeek = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(
    date,
  );
  const monthName = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(
    date,
  );
  const formattedDate = `${monthName} ${day}${getOrdinalSuffix(day)}`;

  return {dayOfWeek, formattedDate};
}

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
