
import { TableClient, AzureSASCredential } from "@azure/data-tables";

const account = "todolistwithdb";
const sas = process.env.SAS_TOKEN as string;
export const dbClient = new TableClient(
  `https://${account}.table.core.windows.net`, account,
  new AzureSASCredential(sas)
);
