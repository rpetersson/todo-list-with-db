"use server"
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

export async function deleteRecord(prevState: any, formData: FormData) {

    const schema = z.object({
      id: z.string().min(1),
    })
    const data = schema.parse({
      id: formData.get('id'),
    })
  
    await prisma.todo.delete({
      where: {
        id: data.id,
      },
    });
    revalidatePath("/"); // To update the page.
    return { message: "Success" };
  }
  
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