import React, { useMemo } from "react";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    MarkerType
} from "reactflow";

import "reactflow/dist/style.css";

export default function SettlementGraph({ settlements = [] }) {


    const { nodes, edges } = useMemo(() => {

        const uniqueUsers = new Map();

        settlements.forEach(s => {

            uniqueUsers.set(s.from.id, s.from.name);
            uniqueUsers.set(s.to.id, s.to.name);
        });

        const radius = 220;
        const centerX = 350;
        const centerY = 250;

        const usersArray = Array.from(uniqueUsers.entries());

        const nodes = usersArray.map(([id, name], index) => {

            const angle = (index / usersArray.length) * 2 * Math.PI;

            return {
                id,
                position: {
                    x: centerX + radius * Math.cos(angle),
                    y: centerY + radius * Math.sin(angle),
                },
                data: {
                    label: name
                },
                style: {
                    padding: 10,
                    borderRadius: "999px",
                    background: "#111",
                    color: "white",
                    border: "2px solid #22c55e",
                    fontWeight: 600,
                    minWidth: 70,
                    textAlign: "center",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
                }
            };
        });


        const edges = settlements.map((s, i) => ({
            id: `e-${i}`,
            source: s.from.id,
            target: s.to.id,
            animated: true,
            label: `₹ ${s.amount}`,
            labelStyle: {
                fill: "#111",
                fontWeight: 700
            },
            style: {
                strokeWidth: 2,
                stroke: "#22c55e"
            },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#22c55e"
            }
        }));

        return { nodes, edges };

    }, [settlements]);


    if (!settlements.length) {

        return (
            <div className="
                h-[500px]
                flex
                items-center
                justify-center
                bg-green-50
                rounded-2xl
                text-green-700
                font-semibold
            ">
                Everyone is settled 🎉
            </div>
        );
    }


    return (

        <div className="
            h-[520px]
            rounded-2xl
            overflow-hidden
            border
            bg-white
            shadow-sm
        ">

            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
            >
                <MiniMap zoomable pannable />
                <Controls />
                <Background gap={16} />
            </ReactFlow>

        </div>
    );
}
