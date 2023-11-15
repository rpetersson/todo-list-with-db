"use server";
import { TableClient, AzureSASCredential } from "@azure/data-tables";
import { DefaultAzureCredential } from "@azure/identity";
import { AddForm } from "./components/addForm";
import { DeleteForm } from "./components/deleteForm";

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

export default async function Home() {
  let todoTasks: { id: string; todoTask: string }[] = [];
  const todoTasksIter = tableClient.listEntities();
  let i = 1;
  for await (const entity of todoTasksIter) {
    //console.log(`Entity${i}: PartitionKey: ${entity.partitionKey} RowKey: ${entity.rowKey}`);
    i++;
    todoTasks.push({ id: entity.rowKey, todoTask: entity.todo });
  }
  console.log(todoTasks);
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="border border-white p-4">
          <h1>Todo:</h1>
          <AddForm />
          <ul>
            {todoTasks.map((todoTask: { id: string; todoTask: string }) => (
              <li key={todoTask.id}>
                {todoTask.todoTask}
                <DeleteForm id={todoTask.id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
