import { motion } from "framer-motion";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteParticipant } from "./participantApi";
import EditParticipantModal from "./EditParticipantModal";

export default function ParticipantCard({ participant }) {

    const [editOpen, setEditOpen] = useState(false);
    const queryClient = useQueryClient();

    //----------------------------------
    // Delete Mutation
    //----------------------------------

    const mutation = useMutation({
        mutationFn: deleteParticipant,

        onSuccess: () => {

            // ⭐ better invalidation pattern
            queryClient.invalidateQueries({
                queryKey: ["participants"]
            });
        },

        onError: (err) => {
            alert(
                err.response?.data?.message ||
                "Cannot delete participant with expenses."
            );
        }
    });

    //----------------------------------

    return (

        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                    duration: 0.16,
                    ease: "easeOut"
                }}
                whileHover={{
                    scale: 1.02
                }}
                className="
                    flex justify-between items-center
                    border border-gray-200
                    p-4 rounded-xl
                    bg-white
                    hover:shadow-md
                "
            >

                {/* LEFT */}
                <div className="flex items-center gap-4">

                    {/* ⭐ PREMIUM AVATAR */}
                    <div
                        className="
                            w-9 h-9
                            rounded-full
                            flex items-center justify-center
                            text-white font-semibold
                        "
                        style={{
                            background:
                            participant.color || "#6366f1"
                        }}
                    >
                        {participant.name
                            ?.charAt(0)
                            .toUpperCase()}
                    </div>

                    <span className="font-medium text-gray-800">
                        {participant.name}
                    </span>

                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-4">

                    {/* EDIT */}
                    <button
                        onClick={() => setEditOpen(true)}
                        className="
                            text-gray-400
                            hover:text-black
                            transition
                        "
                    >
                        <Pencil size={18} />
                    </button>

                    {/* DELETE */}
                    <button
                        disabled={mutation.isPending}
                        onClick={() =>
                            mutation.mutate(participant.id)
                        }
                        className="
                            text-gray-400
                            hover:text-red-500
                            transition
                            disabled:opacity-40
                        "
                    >
                        <Trash2 size={18} />
                    </button>

                </div>

            </motion.div>

            {/* EDIT MODAL */}
            <EditParticipantModal
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
                participant={participant}
            />
        </>
    );
}
