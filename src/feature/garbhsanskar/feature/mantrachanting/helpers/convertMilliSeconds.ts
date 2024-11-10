export function formatMillisecondsToMMSS(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');
  console.log(paddedMinutes);
  return `${paddedMinutes}:${paddedSeconds}`;
}
