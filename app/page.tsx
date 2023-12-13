"use server";
import { TableClient, AzureSASCredential } from "@azure/data-tables";
import { DefaultAzureCredential } from "@azure/identity";
import { AddForm } from "./components/addForm";
import { DeleteForm } from "./components/deleteForm";

const account = "todolistwithdb";
const sas: string | undefined = process.env.SAS_TOKEN ?? "default";
const tableClient = new TableClient(
  `https://${account}.table.core.windows.net`,
  account,
  new AzureSASCredential(sas)
);


export default async function Home() {
  let todoTasks: { rowKey: string, partitionKey: string, todoTask: string }[] = [];
  const todoTasksIter = tableClient.listEntities();
  let i = 1;
  for await (const entity of todoTasksIter) {
    i++;
    todoTasks.push({ rowKey: entity.rowKey as string, partitionKey: entity.partitionKey as string, todoTask: entity.todo as string });
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="border border-white p-4">
          <h1>Todo:</h1>
          <AddForm />
          <ul>
            {todoTasks.map((todoTask: { rowKey: string, partitionKey: string , todoTask: string }) => (
              <li key={todoTask.rowKey}>
                {todoTask.todoTask}
                <DeleteForm id={todoTask.rowKey}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
