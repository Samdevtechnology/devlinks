import { z } from "zod";
import { LinkType } from "@/lib/linkTypes";

export const linkSchema = z.object({
  type: z.union([z.nativeEnum(LinkType), z.literal("")]).default(""),
  url: z.string().url().min(1, "provide url"),
});

export type Link = z.infer<typeof linkSchema>;
