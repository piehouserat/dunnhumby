"use server";

import { createProduct } from "@/lib/api-utils";
import { actionClient } from "./safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  productCode: z.string().min(1, "Product code is required"),
  sku: z.string().min(1, "SKU is required"),
  stockQuantity: z.number().min(0, "Stock quantity must be greater than 0"),
});

export const createProductAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    await createProduct(parsedInput);

    revalidatePath("/products");
  });
