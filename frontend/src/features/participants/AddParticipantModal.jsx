import Modal from "../../components/Modal";
import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addParticipant } from "./participantApi";

export default function AddParticipantModal({
    isOpen,
    onClose,
    groupId
}) {

    const [name, setName] = useState("");
    const [color, setColor] = useState("#6366f1");

    const queryClient = useQueryClient();
    const inputRef = useRef(null);

   
    useEffect(() => {

        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }

    }, [isOpen]);

   
    const handleClose = () => {
        setName("");
        setColor("#6366f1");
        onClose();
    };

    
    const mutation = useMutation({
        mutationFn: addParticipant,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["participants", groupId]
            });

            handleClose();
        }
    });

    

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmed = name.trim();
        if (!trimmed) return;

        mutation.mutate({
            groupId,
            name: trimmed,
            color
        });
    };

    
    return (

        <Modal isOpen={isOpen} onClose={handleClose}>

            {/* Header */}
            <div className="mb-6">

                <h2 className="text-2xl font-bold">
                    Add Participant
                </h2>

                <p className="text-sm text-gray-500">
                    People who share expenses in this group
                </p>

            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Name */}
                <input
                    ref={inputRef}
                    placeholder="Enter name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="
                        w-full border border-gray-200
                        focus:border-black
                        outline-none
                        p-3 rounded-lg
                        transition
                    "
                />

                {/* Color Picker */}
                <div>

                    <p className="text-sm font-medium mb-2">
                        Avatar Color
                    </p>

                    <div className="flex items-center gap-3">

                        <input
                            type="color"
                            value={color}
                            onChange={(e)=>setColor(e.target.value)}
                            className="w-12 h-12 border rounded-lg cursor-pointer"
                        />

                        {/* Preview */}
                        <div
                            className="
                                w-10 h-10 rounded-full
                                flex items-center justify-center
                                text-white font-semibold
                            "
                            style={{ background: color }}
                        >
                            {name
                                ? name.charAt(0).toUpperCase()
                                : "A"}
                        </div>

                    </div>

                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-2">

                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={!name.trim() || mutation.isPending}
                        className={`
                            px-4 py-2 rounded-lg text-white transition
                            ${
                                !name.trim()
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black hover:opacity-90"
                            }
                        `}
                    >
                        {mutation.isPending
                            ? "Adding..."
                            : "Add Participant"}
                    </button>

                </div>

            </form>

        </Modal>
    );
}
