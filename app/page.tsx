"use server";
import { AddForm } from "@/components/addForm";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

export async function addRecord(prevState: any, formData: FormData) {
  console.log(formData.get("todo"));

  const schema = z.object({
    todo: z.string().min(1),
  });

  const data = schema.parse({
    todo: formData.get("todo"),
  });
  try {
    await prisma.todo.create({
      data: {
        todoTask: data.todo, // Updated line
      },
    });
    revalidatePath("/"); // To update the page.
    return { message: "Success" };
  } catch (e) {
    return { message: "error" };
  }
}

export default async function Home() {
  const todoTasks = await prisma.todo.findMany();
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="border border-white p-4">
          <h1>Todo:</h1>
          <AddForm />
          <ul>
            {todoTasks.map((todoTask) => (
              <li key={todoTask.id}>
                {todoTask.todoTask}
                <RemoveButton id={todoTask.id} />{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
