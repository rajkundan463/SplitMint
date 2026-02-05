import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchExpenses } from "./expenseApi";
import ExpenseCard from "./ExpenseCard";
import { useGroup } from "../../context/GroupContext";
import axios from "../../api/axios";

export default function ExpenseList() {

    const { selectedGroup } = useGroup();
    const groupId = selectedGroup?.id;

    const queryClient = useQueryClient();

 
    const { data: expenses = [], isLoading } = useQuery({
        queryKey: ["expenses", groupId],

        queryFn: ({ queryKey }) => {
            const id = queryKey[1];
            return fetchExpenses(id);
        },

        enabled: !!groupId,


        staleTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false,
    });


    
    const deleteMutation = useMutation({

        mutationFn: async (id) => {
            await axios.delete(`/expenses/${id}`);
        },

        onSuccess: () => {

            
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
            queryClient.invalidateQueries({ queryKey: ["settlement"] });
        }
    });


    if (!groupId) return null;

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                Loading expenses...
            </div>
        );
    }


    return (

        <div className="bg-white p-6 rounded-2xl shadow-sm">

            <h2 className="text-xl font-bold mb-4">
                Expenses
            </h2>

            <div className="space-y-3">

                {expenses.length === 0 ? (

                    <p className="text-gray-500">
                        No expenses yet.
                    </p>

                ) : (

                    expenses.map(exp => (
                        <ExpenseCard
                            key={exp.id}
                            expense={exp}
                            onDelete={deleteMutation.mutate}
                        />
                    ))

                )}

            </div>

        </div>
    );
}
