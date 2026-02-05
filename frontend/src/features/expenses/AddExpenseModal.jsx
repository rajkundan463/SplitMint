import Modal from "../../components/Modal";
import { useGroup } from "../../context/GroupContext";
import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { fetchParticipants } from "../participants/participantApi";
import { createExpense } from "./expenseApi";
import { useState, useEffect } from "react";

import SplitSelector from "./SplitSelector";
import ParticipantSelector from "./ParticipantSelector";

export default function AddExpenseModal({ isOpen, onClose }) {

    const { selectedGroup } = useGroup();
    const groupId = selectedGroup?.id;

    const queryClient = useQueryClient();

  
    const { data: participants = [] } = useQuery({
        queryKey: ["participants", groupId],
        queryFn: () => fetchParticipants(groupId),
        enabled: !!groupId
    });

   
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [payer, setPayer] = useState("");
    const [splitMode, setSplitMode] = useState("equal");
    const [selected, setSelected] = useState([]);

    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

  
    useEffect(() => {

        if (!participants.length) return;

        const ids = participants.map(p => p.id);

        setSelected(ids);
        setPayer(ids[0]);

    }, [participants]);

    const resetForm = () => {

        setAmount("");
        setDescription("");
        setSplitMode("equal");
        setSelected([]);
        setPayer("");
        setDate(new Date().toISOString().split("T")[0]);
    };

 
    const mutation = useMutation({

        mutationFn: createExpense,

        onSuccess: () => {

            
            queryClient.invalidateQueries({
                queryKey: ["expenses", groupId]
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard", groupId]
            });

            queryClient.invalidateQueries({
                queryKey: ["settlement", groupId]
            });

            //--------------------------------

            resetForm();
            onClose();
        }
    });

    //---------------------------------------
    // Toggle participant
    //---------------------------------------

    const toggleParticipant = (id) => {

        setSelected(prev => {

            const updated = prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id];

            // Ensure payer always exists
            if (!updated.includes(payer)) {
                setPayer(updated[0] || "");
            }

            return updated;
        });
    };

    //---------------------------------------
    // Submit
    //---------------------------------------

    const handleSubmit = (e) => {

        e.preventDefault();

        //--------------------------------
        // Validation
        //--------------------------------

        if (!amount || Number(amount) <= 0) {
            alert("Enter a valid amount");
            return;
        }

        if (!selected.length) {
            alert("Select at least one participant");
            return;
        }

        if (!payer) {
            alert("Select a payer");
            return;
        }

        //--------------------------------
        // Send RAW data
        // Backend handles ALL math
        //--------------------------------

        mutation.mutate({

            amount: Number(amount),
            description: description || "Expense",
            date,
            groupId,
            payerId: payer,
            splitType: splitMode.toUpperCase(),

            // REQUIRED for equal
            participants: selected

            // splits will be added later
            // for custom / percent smart UI
        });
    };

    //---------------------------------------

    return (

        <Modal isOpen={isOpen} onClose={onClose}>

            <h2 className="text-2xl font-bold mb-6">
                Add Expense
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Amount */}
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border p-3 rounded-xl text-lg"
                />

                {/* Description */}
                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-3 rounded-xl"
                />

                {/* Date */}
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border p-3 rounded-xl"
                />

                {/* Payer */}
                <select
                    value={payer}
                    onChange={(e) => setPayer(e.target.value)}
                    className="w-full border p-3 rounded-xl"
                >
                    {selected.map(id => {

                        const p = participants.find(
                            x => x.id === id
                        );

                        if (!p) return null;

                        return (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        );
                    })}
                </select>

                {/* Split Mode */}
                <SplitSelector
                    splitMode={splitMode}
                    setSplitMode={setSplitMode}
                />

                {/* Participants */}
                <ParticipantSelector
                    participants={participants}
                    selected={selected}
                    toggle={toggleParticipant}
                />

                {/* Submit */}
                <button
                    disabled={
                        mutation.isPending ||
                        !amount ||
                        !payer ||
                        selected.length === 0
                    }
                    className="
                        w-full bg-black text-white py-3 rounded-xl
                        hover:scale-[1.02] transition
                        disabled:opacity-40
                    "
                >
                    {mutation.isPending
                        ? "Adding..."
                        : "Add Expense"}
                </button>

            </form>

        </Modal>
    );
}
