export default function BalanceTable({ balances = [] }) {

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6">

            <h2 className="text-xl font-bold mb-4">
                Group Balances
            </h2>

            <div className="space-y-4">

                {balances.map((b) => (

                    <div
                        key={b.participantId}
                        className="flex justify-between border-b pb-3"
                    >

                        <span className="font-medium">
                            {b.name}
                        </span>

                        <span
                            className={
                                b.balance > 0
                                    ? "text-green-600 font-semibold"
                                    : b.balance < 0
                                    ? "text-red-500 font-semibold"
                                    : "text-gray-400"
                            }
                        >
                            ₹ {Math.abs(b.balance)}
                        </span>

                    </div>
                ))}

            </div>

        </div>
    );
}
