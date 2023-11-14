"use client"
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { PrismaClient } from "@prisma/client";
import { addRecord } from "@/app/actions";


const prisma = new PrismaClient();

const initialState = {
  message: ''
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" aria-disabled={pending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Add
    </button>
  );    
}

export function AddForm() {
  const [state, formAction] = useFormState(addRecord, initialState)
  return (
    <form action={formAction}>
      <p>{state?.message}</p>
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
