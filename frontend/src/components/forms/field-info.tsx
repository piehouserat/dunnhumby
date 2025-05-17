import type { AnyFieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <div className="text-sm font-medium text-destructive">
          {field.state.meta.errors.map((err) => err.message).join(",")}
        </div>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
