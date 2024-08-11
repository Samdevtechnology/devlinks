import { z } from "zod";
import { LinkType } from "@/lib/linkTypes";

export const linkSchema = z.object({
  type: z.nativeEnum(LinkType),
  url: z.string().url().min(1, "provide url"),
});

export type Link = z.infer<typeof linkSchema>;
