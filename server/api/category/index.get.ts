import { getCategories } from "~/lib/db/queries/category";
import defineAdminEventHandler from "~/utils/define-admin-event-handler";

export default defineAdminEventHandler(async (_) => {
  const result = await getCategories();

  return result;
});
