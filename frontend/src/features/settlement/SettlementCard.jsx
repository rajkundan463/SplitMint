import { motion } from "framer-motion";

export default function SettlementCard({settlement}){

    return(

        <motion.div
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            className="
                flex
                justify-between
                items-center
                p-4
                border
                rounded-xl
                mb-3
                hover:shadow-sm
            "
        >
            <div>

                <p className="font-semibold">

                    <span className="text-red-500">
                        {settlement.from.name}
                    </span>

                    {" pays "}

                    <span className="text-green-600">
                        {settlement.to.name}
                    </span>

                </p>

            </div>

            <p className="font-bold text-lg">
                ₹ {settlement.amount}
            </p>

        </motion.div>
    );
}
