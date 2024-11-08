import { differenceInYears, format, formatDistance, parseISO } from "date-fns";

export function calculateAge(dob: Date | string): number {
  if (dob instanceof Date) {
    return differenceInYears(new Date(), dob);
  } else {
    const parsedDob = parseISO(dob);
    if (isNaN(parsedDob.getTime())) {
      throw new Error("Invalid date format. Please use YYYY-MM-DD.");
    }

    return differenceInYears(new Date(), parsedDob);
  }
}

export function createShortDateFormat(date: Date) {
  return format(date, "dd MM yy h:mm: a");
}
export function timeAgo(date: string) {
  return formatDistance(new Date(date) , new Date() + ' ago');
}

export function createChatId(a: string, b: string) {
  return a > b ? `${b}-${a}` : `${a}-${b}`;
}
