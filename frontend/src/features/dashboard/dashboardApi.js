import axios from "../../api/axios";

export const fetchDashboard = async (groupId) => {

    const res = await axios.get(
        `/analytics/${groupId}/dashboard`
    );

    return res.data;
};
