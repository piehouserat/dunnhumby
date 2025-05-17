interface FormLabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

export function FormLabel({ children, htmlFor }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium">
      {children}
    </label>
  );
}
