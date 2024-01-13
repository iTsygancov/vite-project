import { itemSchema, itemsListSchema } from "@/lib/schema";
import * as z from "zod";

export type Item = z.infer<typeof itemSchema>;
export type ItemsList = z.infer<typeof itemsListSchema>;
