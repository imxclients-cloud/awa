/**
 * Client legado — use preferencialmente src/lib/sanity.ts
 */
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "9io7em6p",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
