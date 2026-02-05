const round = (num) =>
    Math.round((Number(num) + Number.EPSILON) * 100) / 100;

exports.equalSplit = (amount, participants = []) => {

    if (!participants.length) {
        throw new Error("Participants required for equal split.");
    }

   
    const total = Number(amount);

    const count = participants.length;

    const share =
        Math.floor((total * 100) / count) / 100;

    let shares = participants.map(id => ({
        participantId: id,
        shareAmount: share
    }));

    
    const distributed = Number((share * count).toFixed(2));
    const remainder = Number((total - distributed).toFixed(2));

    if (remainder !== 0) {
        shares[count - 1].shareAmount =
            Number((shares[count - 1].shareAmount + remainder).toFixed(2));
    }

    return shares;
};




exports.customSplit = (amount, splits = []) => {

    if (!splits.length) {
        throw new Error("Custom split requires share data.");
    }

    const total = Number(amount);

    const totalSplit =
        splits.reduce(
            (sum, s) => sum + Number(s.shareAmount),
            0
        );

    if (round(totalSplit) !== round(total)) {
        throw new Error(
            "Split total must equal expense amount."
        );
    }

    return splits.map(s => ({
        participantId: s.participantId,
        shareAmount: round(s.shareAmount)
    }));
};




exports.percentSplit = (amount, splits = []) => {

    if (!splits.length) {
        throw new Error("Percent split requires data.");
    }

    const total = Number(amount);



    const percentTotal =
        splits.reduce(
            (sum, s) => sum + Number(s.percent),
            0
        );

    if (round(percentTotal) !== 100) {
        throw new Error(
            "Total percentage must equal 100."
        );
    }


    let shares = splits.map(s => ({
        participantId: s.participantId,
        shareAmount: round((s.percent / 100) * total),
        percentage: s.percent
    }));


    const distributed =
        shares.reduce((sum, s) => sum + s.shareAmount, 0);

    const remainder = round(total - distributed);

    if (remainder !== 0) {
        shares[shares.length - 1].shareAmount =
            round(shares[shares.length - 1].shareAmount + remainder);
    }

    return shares;
};
