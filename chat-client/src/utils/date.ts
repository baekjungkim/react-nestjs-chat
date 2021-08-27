import * as dateFns from "date-fns";

export const formatDate = (date: string) => {
  return dateFns.format(new Date(date), "MM/dd/yyyy");
}
export const formatTime = (date: string) => {
  return dateFns.format(new Date(date), "hh:mm:ss");
}