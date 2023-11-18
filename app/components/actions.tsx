"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { dbClient } from "./dbclient";

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
    await dbClient.createEntity(dataToAdd);
    revalidatePath("/"); // To update the page.
    return { message: "Success" };
  } catch (e) {
    return { message: `error ${e}` };
  }
}

export async function deleteRecordAzTable(prevState: any, formData: FormData) {
  const rowKey = formData.get("id")
  
  console.log(rowKey)
  try {
    await dbClient.deleteEntity("todoTasks", rowKey as string, );
    revalidatePath("/"); // To update the page.
    return { message: "Success" };
  } catch (e) {
    return { message: `error ${e}` };
  }
}
