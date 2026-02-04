const prisma = require("../../shared/prisma");

exports.getFilteredExpenses = async (groupId, query) => {

   
    // SAFE PARSING

    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.min(parseInt(query.limit) || 10, 50); 
    // pagination

    const skip = (page - 1) * limit;

    // BUILD WHERE CLAUSE

    const where = {
        groupId
    };

   
    // TEXT SEARCH
    

    if (query.search) {
        where.description = {
            contains: query.search,
            mode: "insensitive"
        };
    }

    // PARTICIPANT FILTER


    if (query.participantId) {

        where.OR = [
            { payerId: query.participantId },
            {
                shares: {
                    some: {
                        participantId:
                            query.participantId
                    }
                }
            }
        ];
    }


    // DATE RANGE


    if (query.startDate || query.endDate) {

        where.date = {};

        if (query.startDate)
            where.date.gte =
                new Date(query.startDate);

        if (query.endDate)
            where.date.lte =
                new Date(query.endDate);
    }


    // AMOUNT FILTER


    if (query.minAmount || query.maxAmount) {

        where.amount = {};

        if (query.minAmount)
            where.amount.gte =
                Number(query.minAmount);

        if (query.maxAmount)
            where.amount.lte =
                Number(query.maxAmount);
    }


    // SORTING


    const orderBy = {};

    if (query.sortBy === "amount")
        orderBy.amount = query.order === "asc"
            ? "asc"
            : "desc";
    else
        orderBy.date = "desc"; 

   
    // QUERY DB


    const [expenses, total] =
        await Promise.all([

            prisma.expense.findMany({
                where,
                include: {
                    payer: true,
                    shares: {
                        include: {
                            participant: true
                        }
                    }
                },
                orderBy,
                skip,
                take: limit
            }),

            prisma.expense.count({ where })
        ]);


    // FORMAT RESPONSE
 

    const formatted = expenses.map(exp => ({
        id: exp.id,
        description: exp.description,
        amount: Number(exp.amount),
        date: exp.date,
        payer: exp.payer.name,

        participants:
            exp.shares.map(s => ({
                name: s.participant.name,
                share: Number(s.shareAmount)
            }))
    }));

    return {
        meta: {
            total,
            page,
            limit,
            totalPages:
                Math.ceil(total / limit)
        },
        data: formatted
    };
};
