"use server";
import { AzureSASCredential, TableClient } from "@azure/data-tables";
import { DefaultAzureCredential } from "@azure/identity";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const credential = new DefaultAzureCredential();
const account = "todolistwithdb";
const tableName = "todo";
const sas =
  "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-29T23:43:30Z&st=2023-11-14T15:43:30Z&spr=https&sig=qat3FqeCribGoj%2B1wixNhliciumMIVOAFii9UhzSZos%3D";
const tableClient = new TableClient(
  `https://${account}.table.core.windows.net`,
  account,
  new AzureSASCredential(sas)
);

export async function addRecordAzTable(prevState: any, formData: FormData) {
  console.log(formData.get("todo"));
  const schema = z.object({
    todo: z.string().min(1),
  });
  const data = schema.parse({
    todo: formData.get("todo"),
  });
  try {
    const dataToAdd = {
      partitionKey: "todoTasks",
      rowKey: crypto.randomUUID(),
      todo: data.todo,
    };
    tableClient.createEntity(dataToAdd);
    revalidatePath("/"); // To update the page.
    return { message: "Success" };
  } catch (e) {
    return { message: `error ${e}` };
  }
}

export async function deleteRecordAzTable(prevState: any, formData: FormData) {
  console.log(formData.get("id"));

  const schema = z.object({
    todo: z.string().min(1),
  });

  const data = schema.parse({
    todo: formData.get("todo"),
  });
  try {
    const dataToAdd = {
      partitionKey: "todoTasks",
      rowKey: crypto.randomUUID(),
      todo: data.todo,
    };
    await tableClient.createEntity(dataToAdd);

    revalidatePath("/"); // To update the page.
    return { message: "Success" };
  } catch (e) {
    return { message: `error ${e}` };
  }
}
