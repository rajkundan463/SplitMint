import Modal from "../../components/Modal";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../api/axios";

export default function EditParticipantModal({
    isOpen,
    onClose,
    participant
}) {

    const [name, setName] = useState("");
    const [color, setColor] = useState("#6366f1");

    const queryClient = useQueryClient();

    useEffect(()=>{

        if(participant){
            setName(participant.name);
            setColor(participant.color || "#6366f1");
        }

    },[participant]);

    const mutation = useMutation({

        mutationFn: () =>
            axios.patch(
                `/participants/${participant.id}`,
                { name, color }
            ),

        onSuccess: ()=>{

            queryClient.invalidateQueries(["participants"]);
            onClose();
        }
    });

    if(!participant) return null;

    return (

        <Modal isOpen={isOpen} onClose={onClose}>

            <h2 className="text-2xl font-bold mb-4">
                Edit Participant
            </h2>

            <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
            />

            <input
                type="color"
                value={color}
                onChange={(e)=>setColor(e.target.value)}
                className="w-12 h-12 mb-6"
            />

            <button
                onClick={()=>mutation.mutate()}
                className="bg-black text-white px-4 py-2 rounded-lg"
            >
                Save
            </button>

        </Modal>
    );
}
