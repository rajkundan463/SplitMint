const round = (num) => Number(num.toFixed(2));

exports.equalSplit = (amount, participants) => {

    const total = Number(amount);
    const count = participants.length;

    const share = round(total / count);

    let shares = participants.map(id => ({
        participantId: id,
        shareAmount: share
    }));

    // Fix remainder
    const calculated = round(share * count);
    const diff = round(total - calculated);

    if (diff !== 0) {
        shares[count - 1].shareAmount =
            round(shares[count - 1].shareAmount + diff);
    }

    return shares;
};

exports.customSplit = (amount, splits) => {

    const totalSplit =
        splits.reduce((sum, s) => sum + Number(s.shareAmount), 0);

    if (round(totalSplit) !== round(amount)) {
        throw new Error("Split total must equal expense amount");
    }

    return splits;
};

exports.percentSplit = (amount, splits) => {

    let shares = splits.map(s => ({
        participantId: s.participantId,
        shareAmount: round((s.percent / 100) * amount)
    }));

    const totalShares =
        shares.reduce((sum, s) => sum + s.shareAmount, 0);

    const diff = round(amount - totalShares);

    if (diff !== 0) {
        shares[shares.length - 1].shareAmount += diff;
    }

    return shares;
};
