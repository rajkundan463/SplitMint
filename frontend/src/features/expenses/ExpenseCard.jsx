import { motion } from "framer-motion";
import { Trash2, Pencil } from "lucide-react";

export default function ExpenseCard({
    expense,
    onDelete,
    onEdit
}){

    return(

        <motion.div
            layout
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            className="p-4 border rounded-xl flex justify-between items-center hover:shadow-sm"
        >

            <div>

                <p className="font-semibold">
                    {expense.description}
                </p>

                <p className="text-sm text-gray-500">
                    ₹ {expense.amount}
                </p>

            </div>

            <div className="flex gap-3">

                <Pencil
                    size={18}
                    className="cursor-pointer"
                    onClick={()=>onEdit(expense)}
                />

                <Trash2
                    size={18}
                    className="cursor-pointer text-red-500"
                    onClick={()=>onDelete(expense.id)}
                />

            </div>

        </motion.div>
    )
}
