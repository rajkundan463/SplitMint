const prisma = require("../../shared/prisma");


// calculateBalances: Computes net balances for each participant in the group


const calculateBalances = async (groupId) => {

    // Fetch participants first (VERY IMPORTANT)
    const participants = await prisma.participant.findMany({
        where: { groupId },
        select: { id: true, name: true }
    });

    const balanceMap = {};
    const nameMap = {};

    participants.forEach(p => {
        balanceMap[p.id] = 0;
        nameMap[p.id] = p.name;
    });

    const expenses = await prisma.expense.findMany({
        where: { groupId },
        include: { shares: true }
    });

    expenses.forEach(expense => {

        const payer = expense.payerId;
        const amount = parseFloat(expense.amount);

        balanceMap[payer] += amount;

        expense.shares.forEach(share => {

            const participant = share.participantId;
            const shareAmount = parseFloat(share.shareAmount);

            balanceMap[participant] -= shareAmount;
        });
    });

    // Round balances (financial safety)
    Object.keys(balanceMap).forEach(id => {
        balanceMap[id] = Number(balanceMap[id].toFixed(2));
    });

    return { balanceMap, nameMap };
};


// MInimal number of transactions to settle debts


const simplifyDebts = (balances) => {

    const creditors = [];
    const debtors = [];

    Object.entries(balances).forEach(([id, amount]) => {

        if (amount > 0)
            creditors.push({ id, amount });

        else if (amount < 0)
            debtors.push({ id, amount: Math.abs(amount) });
    });

    // Sorting improves optimization
    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    const settlements = [];

    let i = 0;
    let j = 0;

    while (i < debtors.length && j < creditors.length) {

        const debt = debtors[i];
        const credit = creditors[j];

        const settledAmount =
            Number(Math.min(debt.amount, credit.amount).toFixed(2));

        settlements.push({
            from: debt.id,
            to: credit.id,
            amount: settledAmount
        });

        debt.amount -= settledAmount;
        credit.amount -= settledAmount;

        if (debt.amount === 0) i++;
        if (credit.amount === 0) j++;
    }

    return settlements;
};


// final service to get group settlement details


const getGroupSettlement = async (groupId) => {

    const { balanceMap, nameMap } =
        await calculateBalances(groupId);

    const settlementsRaw =
        simplifyDebts(balanceMap);


    // Format balances (


    const balances = Object.entries(balanceMap).map(
        ([id, amount]) => ({
            participantId: id,
            name: nameMap[id],
            balance: amount,
            status:
                amount > 0
                    ? "gets"
                    : amount < 0
                    ? "owes"
                    : "settled"
        })
    ).sort((a,b)=>b.balance-a.balance);


    // Format settlements (Human readable)
 

    const settlements = settlementsRaw.map(s => ({
        from: {
            id: s.from,
            name: nameMap[s.from]
        },
        to: {
            id: s.to,
            name: nameMap[s.to]
        },
        amount: s.amount
    }));

   
    // Get total spent (Summary Card Ready)


    const total = await prisma.expense.aggregate({
        where: { groupId },
        _sum: { amount: true }
    });

  

    return {
        summary: {
            totalSpent: total._sum.amount || 0
        },
        balances,
        settlements
    };
};
module.exports = { getGroupSettlement,simplifyDebts, calculateBalances};


// {
//     "summary": {
//         "totalSpent": "3200"
//     },
//     "balances": [
//         {
//             "participantId": "e2eb3c6c-92e0-40b8-891b-fdb4cc5f3fa4",
//             "name": "shyam",
//             "balance": 700,
//             "status": "gets"
//         },
//         {
//             "participantId": "75148d0f-e191-4697-bfa1-9d5a73d27f52",
//             "name": "ram",
//             "balance": 400,
//             "status": "gets"
//         },
//         {
//             "participantId": "c9eeed5d-a609-4355-9e26-dd278c39a5a8",
//             "name": "Kundan",
//             "balance": -300,
//             "status": "owes"
//         },
//         {
//             "participantId": "789a6087-8a93-4265-ae9d-e74d56cc37fb",
//             "name": "saloni",
//             "balance": -800,
//             "status": "owes"
//         }
//     ],
//     "settlements": [
//         {
//             "from": {
//                 "id": "789a6087-8a93-4265-ae9d-e74d56cc37fb",
//                 "name": "saloni"
//             },
//             "to": {
//                 "id": "e2eb3c6c-92e0-40b8-891b-fdb4cc5f3fa4",
//                 "name": "shyam"
//             },
//             "amount": 700
//         },
//         {
//             "from": {
//                 "id": "789a6087-8a93-4265-ae9d-e74d56cc37fb",
//                 "name": "saloni"
//             },
//             "to": {
//                 "id": "75148d0f-e191-4697-bfa1-9d5a73d27f52",
//                 "name": "ram"
//             },
//             "amount": 100
//         },
//         {
//             "from": {
//                 "id": "c9eeed5d-a609-4355-9e26-dd278c39a5a8",
//                 "name": "Kundan"
//             },
//             "to": {
//                 "id": "75148d0f-e191-4697-bfa1-9d5a73d27f52",
//                 "name": "ram"
//             },
//             "amount": 300
//         }
//     ]
// }