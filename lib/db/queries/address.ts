import type { AddressFormSchemaType } from "../schema";
import type { DBorTX } from "../types";

import db from "..";
import { addresses } from "../schema";

export async function insertAddress(values: AddressFormSchemaType, userId: number, dbInstance: DBorTX = db) {
  const [inserted] = await dbInstance.insert(addresses).values({ ...values, userId }).returning();
  return inserted;
}
