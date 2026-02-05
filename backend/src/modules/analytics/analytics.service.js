const prisma = require("../../shared/prisma");
const { simplifyDebts } = require("../balance/balance.service");

exports.getGroupDashboard = async (groupId, userParticipantId, filters) => {

    // BUILD FILTER

    const where = { groupId };

    if (filters?.startDate || filters?.endDate) {
        where.date = {};
        if (filters.startDate)
            where.date.gte = new Date(filters.startDate);

        if (filters.endDate)
            where.date.lte = new Date(filters.endDate);
    }

    if (filters?.minAmount) {
        where.amount = { gte: Number(filters.minAmount) };
    }

    if (filters?.payerId) {
        where.payerId = filters.payerId;
    }

    // FETCH DATA (ONE QUERY = GOOD ENGINEERING)

    const group = await prisma.group.findUnique({
        where: { id: groupId },
        include: {
            participants: true,
            expenses: {
                where,
                include: {
                    shares: {
                        include: {
                            participant: true
                        }
                    },
                    payer: true
                },
                orderBy: { date: "desc" }
            }
        }
    });

    if (!group) throw new Error("Group not found");

    const { participants, expenses } = group;


    // SUMMARY


    let totalSpent = 0;

    expenses.forEach(e => {
        totalSpent += Number(e.amount);
    });

    // CONTRIBUTIONS

    const contributions = {};

    participants.forEach(p => {
        contributions[p.id] = {
            name: p.name,
            paid: 0,
            percentage: 0
        };
    });

    expenses.forEach(e => {
        contributions[e.payerId].paid += Number(e.amount);
    });

    Object.values(contributions).forEach(c => {
        c.percentage = totalSpent
            ? Number(((c.paid / totalSpent) * 100).toFixed(1))
            : 0;
    });


    // BALANCES

    const balances = {};

    participants.forEach(p => balances[p.id] = 0);

    expenses.forEach(exp => {

        balances[exp.payerId] += Number(exp.amount);

        exp.shares.forEach(share => {
            balances[share.participantId] -=
                Number(share.shareAmount);
        });
    });


    // YOU OWE / YOU ARE OWED

    if (!balances.hasOwnProperty(userParticipantId)) {
        throw new Error(
            "Financial identity mismatch — participant not found in balances"
        );
    }

    const yourBalance = balances[userParticipantId];


    const youOwe = yourBalance < 0
        ? Math.abs(yourBalance)
        : 0;

    const youAreOwed = yourBalance > 0
        ? yourBalance
        : 0;


    // DIRECTIONAL BALANCES (SETTLEMENT ENGINE )

    const settlements = simplifyDebts(balances);
    // BALANCE TABLE WITH STATUS

    const balanceTable = participants.map(p => {

        const amount = Number((balances[p.id] || 0).toFixed(2));

        return {
            participantId: p.id,
            name: p.name,
            netBalance: amount,
            status:
                amount > 0
                    ? "gets_back"
                    : amount < 0
                        ? "owes"
                        : "settled"
        };
    });

    // TRANSACTIONS WITH SHARE BREAKDOWN
    const transactions = expenses.map(exp => ({
        id: exp.id,
        description: exp.description,
        amount: Number(exp.amount),
        date: exp.date,
        payer: exp.payer.name,

        shares: exp.shares.map(s => ({
            participant: s.participant.name,
            amount: Number(s.shareAmount)
        }))
    }));


    // FINAL RESPONSE

    return {
        summary: {
            totalSpent: Number(totalSpent.toFixed(2)),
            totalExpenses: expenses.length,
            youOwe: Number(youOwe.toFixed(2)),
            youAreOwed: Number(youAreOwed.toFixed(2))
        },

        contributions: Object.values(contributions),

        balanceTable,

        directionalBalances: settlements,

        transactions
    };
};
