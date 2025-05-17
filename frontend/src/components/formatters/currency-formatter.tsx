interface CurrencyFormatterProps {
  value: number | null;
}

export const CurrencyFormatter = ({ value }: CurrencyFormatterProps) => {
  if (!value) {
    return;
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
};
