import axios from "../../api/axios";

export const fetchGroups = async () => {
    const res = await axios.get("/groups");

    return res.data.groups || res.data;
};
