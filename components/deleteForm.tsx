"use client"
import { deleteRecord } from "@/app/actions";
import { PrismaClient } from "@prisma/client";
import { useFormState } from "react-dom";

const prisma = new PrismaClient();

const initialState = {
    message: ''
}

 export function RemoveButton() {
    return (
        <button type="submit" aria-disabled={false} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Remove
        </button>
     
    );
  }
  
export function DeleteForm({ id }: { id: string }) {
    const [state, formAction] = useFormState(deleteRecord, initialState)
    return (
        <form action={formAction}>
          <input type="hidden" name="id" value={id}>

          </input>
        <RemoveButton />

      </form>
    )
  }