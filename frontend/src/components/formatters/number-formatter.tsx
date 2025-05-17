interface NumberFormatterProps {
  value: number | null | undefined;
}

export const NumberFormatter = ({ value }: NumberFormatterProps) => {
  if (!value) {
    return;
  }

  return new Intl.NumberFormat("en-US").format(value);
};
