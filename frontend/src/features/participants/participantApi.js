import axios from "../../api/axios";

export const fetchParticipants = async (groupId) => {

    const res = await axios.get(
        `/groups/${groupId}/participants`
    );

    return res.data ?? [];
};

export const addParticipant = async ({groupId, name}) => {

    const res = await axios.post(
        `/groups/${groupId}/participants`,
        { name }
    );

    return res.data;
};
export const deleteParticipant = async (participantId) => {

    await axios.delete(
        `/participants/${participantId}`
    );
};
