import { useState } from "react";
import SettlementModal from "./SettlementModal";

export default function SettlementButton(){

    const [open,setOpen] = useState(false);

    return(

        <>
            <button
                onClick={()=>setOpen(true)}
                className="
                    bg-green-600
                    text-white
                    px-5 py-3
                    rounded-xl
                    hover:scale-105
                    transition
                    font-semibold
                "
            >
                Settle Up
            </button>

            <SettlementModal
                isOpen={open}
                onClose={()=>setOpen(false)}
            />
        </>
    )
}
