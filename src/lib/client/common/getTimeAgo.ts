import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function getRelativeTime(date: Date = new Date()) {
  return dayjs(date).fromNow();
}
