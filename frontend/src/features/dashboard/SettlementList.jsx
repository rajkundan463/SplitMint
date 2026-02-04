export default function SettlementList({ settlements = [] }) {

    if (!settlements.length) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                Everyone is settled 🎉
            </div>
        );
    }

    return (

        <div className="bg-white p-6 rounded-2xl shadow-sm">

            <h2 className="text-xl font-bold mb-4">
                Suggested Settlements
            </h2>

            <div className="space-y-3">

                {settlements.map((s, i) => (

                    <div
                        key={i}
                        className="flex justify-between"
                    >
                        <span>
                            <b>{s.from.name}</b> → pays → <b>{s.to.name}</b>
                        </span>

                        <span className="font-semibold">
                            ₹ {s.amount}
                        </span>
                    </div>

                ))}

            </div>

        </div>
    );
}
