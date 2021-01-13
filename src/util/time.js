import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

function convertTimeAgo(date) {
  if (!date) {
    return date;
  }

  const currentTime = new Date();
  if (date > currentTime) {
    return timeAgo.format(currentTime);
  }
  return timeAgo.format(date);
}

//Convert from UTC to ms int
function convertUTC(date) {
  return new Date(date).getTime();
}

//Convert from UTC to AM/PM hour min time
function convertCreatedAt(date) {
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return time;
}

// Convert string to enUS time if a UTC date otherwise return original date
function convertTimeString(date) {
  if (!Date.parse(date)) {
    return date;
  }
  const time = new Date(date);
  return convertCreatedAt(time);
}

// Convert string to enUS time if a UTC date otherwise return original date
function convertTimeAgoString(date) {
  if (!Date.parse(date)) {
    return date;
  }
  const time = new Date(date);
  return convertTimeAgo(time);
}

// Convert string to enUS time if a UTC date otherwise return original date
function convertDateString(date) {
  if (!Date.parse(date)) {
    return date;
  }
  const time = new Date(date);
  return `${time.getMonth()}/${time.getDate()}/${time.getFullYear()}`;
}

export default {
  convertCreatedAt,
  convertDateString,
  convertTimeAgoString,
  convertTimeString,
  convertTimeAgo,
  convertUTC,
};
