//--------------------------------
// Compute Net Balances
//--------------------------------

export const computeBalances = (expenses)=>{

    const balanceMap={};

    expenses.forEach(expense=>{

        const payer=expense.payerId;

        if(!balanceMap[payer])
            balanceMap[payer]=0;

        balanceMap[payer]+=Number(expense.amount);

        expense.shares.forEach(share=>{

            const id=share.participantId;

            if(!balanceMap[id])
                balanceMap[id]=0;

            balanceMap[id]-=Number(share.shareAmount);
        });

    });

    return balanceMap;
};



//--------------------------------
// Minimize Transactions
//--------------------------------

export const simplifyDebts = (balances)=>{

    const creditors=[];
    const debtors=[];

    Object.entries(balances).forEach(([id,amount])=>{

        if(amount>0)
            creditors.push({id,amount});

        else if(amount<0)
            debtors.push({id,amount:Math.abs(amount)});
    });

    creditors.sort((a,b)=>b.amount-a.amount);
    debtors.sort((a,b)=>b.amount-a.amount);

    const settlements=[];

    let i=0;
    let j=0;

    while(i<debtors.length && j<creditors.length){

        const debt=debtors[i];
        const credit=creditors[j];

        const settled=
            Number(Math.min(debt.amount,credit.amount).toFixed(2));

        settlements.push({
            from:debt.id,
            to:credit.id,
            amount:settled
        });

        debt.amount-=settled;
        credit.amount-=settled;

        if(debt.amount===0) i++;
        if(credit.amount===0) j++;
    }

    return settlements;
};
