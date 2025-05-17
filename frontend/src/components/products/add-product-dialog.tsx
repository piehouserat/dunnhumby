"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import type { Category } from "@/lib/types";
import { z } from "zod";
import { FieldInfo } from "@/components/forms/field-info";
import { FormLabel } from "../forms/form-label";
import { FormItem } from "../forms/form-item";
import { createProductAction } from "@/actions/create-product-action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useState } from "react";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .number()
    .min(1, "Price is required")
    .positive("Price must be a positive number"),
  categoryId: z.string().min(1, "Category is required"),
  productCode: z.string().min(1, "Product code is required"),
  sku: z.string().min(1, "SKU is required"),
  stockQuantity: z.number().min(0, "Stock quantity must be greater than 0"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface AddProductDialogProps {
  categories: Category[];
}

export function AddProductDialog({ categories }: AddProductDialogProps) {
  const [open, setOpen] = useState(false);
  const action = useAction(createProductAction, {
    onSuccess: () => {
      form.reset();
      toast.success("Product created successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to create product");
    },
  });

  const defaultValues: ProductFormValues = {
    name: "",
    price: 0,
    categoryId: "",
    productCode: "",
    sku: "",
    stockQuantity: 0,
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: productSchema,
    },
    onSubmit: async ({ value }) => {
      await action.execute(value);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the product details below
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FormItem>
            <FormLabel htmlFor="name">Name</FormLabel>
            <form.Field name="name">
              {(field) => (
                <>
                  <Input
                    id="name"
                    name="name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="price">Price</FormLabel>
            <form.Field name="price">
              {(field) => (
                <>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="categoryId">Category</FormLabel>
            <form.Field name="categoryId">
              {(field) => (
                <>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="productCode">Product Code</FormLabel>
            <form.Field name="productCode">
              {(field) => (
                <>
                  <Input
                    id="productCode"
                    name="productCode"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="sku">SKU</FormLabel>
            <form.Field name="sku">
              {(field) => (
                <>
                  <Input
                    id="sku"
                    name="sku"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="stockQuantity">Stock Quantity</FormLabel>
            <form.Field name="stockQuantity">
              {(field) => (
                <>
                  <Input
                    id="stockQuantity"
                    name="stockQuantity"
                    type="number"
                    min="0"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </FormItem>
          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={action.isExecuting}>
              {action.isExecuting ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
