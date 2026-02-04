export default function SummaryCards({ summary }) {

    const cards = [
        {
            title: "Total Spent",
            value: `₹ ${summary?.totalSpent ?? 0}`
        },
        {
            title: "You Owe",
            value: `₹ ${summary?.youOwe ?? 0}`
        },
        {
            title: "You Are Owed",
            value: `₹ ${summary?.youAreOwed ?? 0}`
        }
    ];

    return (

        <div className="grid grid-cols-3 gap-6">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="bg-white p-6 rounded-2xl shadow-sm"
                >

                    <p className="text-gray-500 mb-2">
                        {card.title}
                    </p>

                    <h2 className="text-2xl font-bold">
                        {card.value}
                    </h2>

                </div>
            ))}

        </div>
    );
}
