import axios from "../../api/axios";

export const fetchSettlement = async (groupId)=>{

    const res = await axios.get(
        `/balance/${groupId}/settlement`
    );

    return res.data.data;
};
