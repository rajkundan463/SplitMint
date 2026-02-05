import { useState } from "react";
import AddExpenseModal from "./AddExpenseModal";

export default function AddExpenseButton(){

    const [open,setOpen] = useState(false);

    return(
        <>
            <button
                onClick={()=>setOpen(true)}
                className="bg-black text-white px-4 py-2 rounded-xl hover:scale-105 transition"
            >
                + Add Expense
            </button>

            <AddExpenseModal
                isOpen={open}
                onClose={()=>setOpen(false)}
            />
        </>
    )
}
