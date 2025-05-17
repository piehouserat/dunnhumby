import { formatDate } from "@/lib/date-utils";

interface DateFormatterProps {
  value: string | null;
}

export const DateFormatter = ({ value }: DateFormatterProps) => {
  if (!value) {
    return null;
  }

  return <span suppressHydrationWarning>{formatDate(value)}</span>;
};
