"use server";
import { AddForm } from "./components/addForm";
import { PrismaClient } from "@prisma/client";
import { DeleteForm } from "./components/deleteForm";

const prisma = new PrismaClient();

export default async function Home() {
  const todoTasks = await prisma.todo.findMany();
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="border border-white p-4">
          <h1>Todo:</h1>
          <AddForm />
          <ul>
            {todoTasks.map((todoTask:{id:string, todoTask:string}) => (
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
