
import { TableClient, AzureSASCredential } from "@azure/data-tables";
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential();
const account = "todolistwithdb";
const tableName = "todo";
const sas: string | undefined = process.env.SAS_TOKEN ?? "default";
const tableClient = new TableClient(
  `https://${account}.table.core.windows.net`,
  account,
  new AzureSASCredential(sas)
);
