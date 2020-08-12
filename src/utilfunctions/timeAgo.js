import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

export function convertTimeAgo(date) {
  if (!date) {
    return date;
  }
  return timeAgo.format(date);
}

//Convert from UTC to AM/PM hour min time
export function convertCreatedAt(date) {
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return time;
}

// Convert string to enUS time if a UTC date otherwise return original date
export function convertDateString(date) {
  if (!Date.parse(date)) {
    return date;
  }
  const time = new Date(date);
  return convertCreatedAt(time);
}
