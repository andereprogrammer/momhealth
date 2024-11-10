export function timestampToAMPM(timestamp: string): string {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour format to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Add leading zero to minutes if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Create the formatted time string
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return formattedTime;
}
