import Modal from "../../components/Modal";
import { useGroup } from "../../context/GroupContext";
import { useQuery } from "@tanstack/react-query";
import { fetchSettlement } from "./settlementApi";
import SettlementCard from "./SettlementCard";
import NoDebtCard from "./NoDebtCard";
import SettlementGraph from "./SettlementGraph";
import { useState } from "react";

export default function SettlementModal({ isOpen, onClose }) {

    const { selectedGroup } = useGroup();
    const groupId = selectedGroup?.id;

    //----------------------------------
    // STATES
    //----------------------------------

    const [showGraph, setShowGraph] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    //----------------------------------
    // FETCH SETTLEMENT
    //----------------------------------

    const { data, isLoading } = useQuery({
        queryKey: ["settlement", groupId],
        queryFn: () => fetchSettlement(groupId),
        enabled: !!groupId
    });

    const settlements = data?.settlements || [];

    //----------------------------------
    // LOADING
    //----------------------------------

    if (isLoading) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="p-10 text-center font-semibold">
                    Calculating balances...
                </div>
            </Modal>
        );
    }

    //----------------------------------
    // FULLSCREEN GRAPH
    //----------------------------------

    if (fullscreen) {
        return (
            <div className="fixed inset-0 z-[999] bg-[#020617]">

                {/* TOP BAR */}
                <div className="
                    flex
                    justify-between
                    items-center
                    p-4
                    border-b
                    border-slate-800
                ">

                    <h2 className="text-xl font-bold text-white">
                        Settlement Flow
                    </h2>

                    <button
                        onClick={() => setFullscreen(false)}
                        className="
                            px-4 py-2
                            bg-white
                            text-black
                            rounded-lg
                            hover:scale-105
                            transition
                        "
                    >
                        Exit Fullscreen
                    </button>

                </div>

                {/* GRAPH */}
                <div className="h-[calc(100vh-70px)] w-full">
                    <SettlementGraph settlements={settlements} />
                </div>

            </div>
        );
    }

    //----------------------------------
    // NORMAL MODAL
    //----------------------------------

    return (

        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="max-w-4xl" // ← IMPORTANT for graph breathing space
        >

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                    Suggested Settlements
                </h2>

                <div className="flex items-center gap-4">

                    <button
                        onClick={() => setShowGraph(!showGraph)}
                        className="
                            px-4 py-2
                            bg-black
                            text-white
                            rounded-lg
                            hover:scale-105
                            transition
                            shadow-sm
                        "
                    >
                        {showGraph ? "Show List" : "View Graph"}
                    </button>

                    {showGraph && settlements.length > 0 && (
                        <button
                            onClick={() => setFullscreen(true)}
                            className="
                                px-4 py-2
                                bg-green-600
                                text-white
                                rounded-lg
                                hover:scale-105
                                transition
                                shadow-sm
                            "
                        >
                            Fullscreen
                        </button>
                    )}

                </div>

            </div>

            {/* CONTENT */}

            {
                !settlements.length
                    ? <NoDebtCard />

                    : showGraph
                        ? (
                            <div className="h-[520px]">
                                <SettlementGraph settlements={settlements} />
                            </div>
                        )

                        : (
                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                                {settlements.map((s, i) => (
                                    <SettlementCard
                                        key={i}
                                        settlement={s}
                                    />
                                ))}
                            </div>
                        )
            }

        </Modal>
    );
}
