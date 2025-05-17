import { formatDateTime } from "@/lib/date-utils";

interface DateTimeFormatterProps {
  value: string | null;
}

export const DateTimeFormatter = ({ value }: DateTimeFormatterProps) => {
  if (!value) {
    return null;
  }

  return <span suppressHydrationWarning>{formatDateTime(value)}</span>;
};
