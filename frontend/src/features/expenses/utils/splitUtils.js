
export const equalSplit = (amount, participants) => {

    const total = Number(amount);

    const share = Math.floor((total / participants.length) * 100) / 100;

    let remainder =
        Number((total - share * participants.length).toFixed(2));

    const shares = participants.map((p,i)=>{

        if(i === participants.length-1){
            return {
                participantId:p,
                shareAmount:Number((share+remainder).toFixed(2))
            }
        }

        return {
            participantId:p,
            shareAmount:share
        }

    });

    return shares;
};



export const percentSplit = (amount, percents)=>{

    return Object.entries(percents).map(
        ([participantId,percent])=>({

            participantId,
            shareAmount:
                Number(((amount*percent)/100).toFixed(2)),
            percentage:percent
        })
    );
};



export const customSplit = (values)=>{

    return Object.entries(values).map(
        ([participantId,shareAmount])=>({

            participantId,
            shareAmount:Number(shareAmount)
        })
    );
};
