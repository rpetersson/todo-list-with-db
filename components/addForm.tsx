"use client"
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { PrismaClient } from "@prisma/client";
import { addRecord } from "@/app/page";
import { init } from "next/dist/compiled/webpack/webpack";

const prisma = new PrismaClient();



function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );    
}

export function AddForm() {
  const [state, formAction] = useFormState(addRecord, null)
  return (
    <form action={formAction}>
      <label htmlFor="todo">Enter Task</label>
      <ul id="list">
        <li>
          <input
            type="text"
            placeholder="What do you need to do?"
            className="text-black"
            id="todo"
            name="todo"
            required
          ></input>
        </li>
        <li>
          <SubmitButton />
        </li>
      </ul>
    </form>
  );
}
