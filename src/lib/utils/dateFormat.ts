import { format } from "date-fns";

const dateFormat = (
  date: Date | string | undefined,
  pattern: string = "dd MMM, yyyy",
): string => {
  if (!date) return "";
  const dateObj = new Date(date);
  if (Number.isNaN(dateObj.getTime())) return "";
  const output = format(dateObj, pattern);
  return output;
};

export default dateFormat;
