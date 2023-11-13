import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { useFormState } from "react-dom";

const prisma = new PrismaClient();

const initialState = {
    message: ''
}

export async function removeData(prevState: any, id: string) {
    await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/"); // To update the page.
    return { message: "asd" };
  }
  
export function DeleteForm({ id }: { id: string }) {
    const [state, formAction] = useFormState(removeData, initialState)
    return (
      <form action={formAction}>
  
      </form>
    );
  }