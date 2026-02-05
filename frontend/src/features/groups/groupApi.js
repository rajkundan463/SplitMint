import axios from "../../api/axios";

export const fetchGroups = async () => {
    const res = await axios.get("/groups");

    return res.data.groups || res.data;
};

export const createGroup = async (data) => {

    const res = await axios.post("/groups", data);

    return res.data;
};
export const updateGroup = async ({ groupId, name }) => {

    const res = await axios.patch(
        `/groups/${groupId}`,
        { name }
    );

    return res.data;
};
export const deleteGroup = async (groupId) => {

    const res = await axios.delete(
        `/groups/${groupId}`
    );

    return res.data;
};
