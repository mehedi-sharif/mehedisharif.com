import { format } from "date-fns";

const dateFormat = (date, pattern) => {
  const dateObj = new Date(date);
  const output = format(dateObj, pattern);
  return output;
};

export default dateFormat;
