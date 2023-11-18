
import { TableClient, AzureSASCredential } from "@azure/data-tables";

const account = "todolistwithdb";
const sas: string | undefined = process.env.SAS_TOKEN ?? "default";
export const dbClient = new TableClient(
  `https://${account}.table.core.windows.net`,
  account,
  new AzureSASCredential(sas)
);
