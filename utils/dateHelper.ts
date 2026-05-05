export function getWeekOfMonth(date: Date) {
  return Math.ceil(date.getDate() / 7)
}
