import { useQuery } from "@tanstack/react-query";
import { fetchParticipants } from "./participantApi";
import { useGroup } from "../../context/GroupContext";
import ParticipantCard from "./ParticipantCard";
import AddParticipantModal from "./AddParticipantModal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ParticipantManager() {

    const { selectedGroup } = useGroup();

    const groupId = selectedGroup?.id;

    const [open, setOpen] = useState(false);
    const [limitOpen, setLimitOpen] = useState(false);


    const { data: participants = [], isLoading } = useQuery({
        queryKey: ["participants", groupId],
        queryFn: () => fetchParticipants(groupId),
        enabled: !!groupId
    });

    if (!groupId) return null;

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[170px]">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-xl font-bold">
                        Participants ({participants.length})
                    </h2>

                    <p className="text-sm text-gray-500">
                        Manage who shares expenses
                    </p>

                </div>

                <button
                    onClick={() => {

                        if (participants.length >= 4) {
                            setLimitOpen(true);
                            return;
                        }

                        setOpen(true);
                    }}
                    className="bg-black text-white px-3 py-2 rounded-lg hover:opacity-90 transition"
                >
                    + Add
                </button>

            </div>

            {/* LOADING STATE */}
            {isLoading && (
                <p className="text-gray-400">
                    Loading participants...
                </p>
            )}

            {/* EMPTY STATE */}
            {!isLoading && participants.length === 0 && (

                <div className="text-center py-10">

                    <p className="text-gray-500 mb-3">
                        No participants yet
                    </p>

                    <button
                        onClick={() => setOpen(true)}
                        className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                        Add First Participant
                    </button>

                </div>
            )}

            {/* ⭐ ANIMATED LIST */}
            <AnimatePresence>

                <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                >

                    {participants.map((p) => (

                        <ParticipantCard
                            key={p.id}
                            participant={p}
                        />

                    ))}

                </motion.div>

            </AnimatePresence>

            {/* MODAL */}
            <AddParticipantModal
                isOpen={open}
                onClose={() => setOpen(false)}
                groupId={groupId}
            />

        </div>
    );
}
