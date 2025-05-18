import { format, startOfMonth } from "date-fns";

export const formatDate = (dateString: string) => {
  if (!dateString) return;

  return format(dateString, "dd/MM/yyyy");
};

export const formatDateTime = (dateString: string) => {
  if (!dateString) return;

  return format(dateString, "dd/MM/yyyy HH:mm");
};

export const getStartOfCurrentMonth = () => {
  return startOfMonth(new Date());
};

export const getToday = () => {
  return new Date();
};
