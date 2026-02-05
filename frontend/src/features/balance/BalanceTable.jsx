export default function BalanceTable({balances}){

    return(

        <div className="bg-white p-6 rounded-2xl shadow-sm">

            <h2 className="text-xl font-bold mb-4">
                Net Balances
            </h2>

            <div className="space-y-3">

                {balances.map(b=>(

                    <div
                        key={b.participantId}
                        className="flex justify-between border-b pb-2"
                    >

                        <span className="font-medium">
                            {b.name}
                        </span>

                        <span
                            className={
                                b.balance>0
                                ?"text-green-600 font-semibold"
                                :"text-red-500 font-semibold"
                            }
                        >
                            ₹ {Math.abs(b.balance)}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    )
}
