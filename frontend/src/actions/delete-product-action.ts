"use server";

import { deleteProduct } from "@/lib/api-utils";
import { actionClient } from "./safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({
  id: z.string(),
});

export const deleteProductAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    await deleteProduct(parsedInput.id);

    revalidatePath("/products");
  });
