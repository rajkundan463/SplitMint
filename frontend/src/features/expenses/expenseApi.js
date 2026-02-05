import axios from "../../api/axios";

export const createExpense = async (data) => {

    const res = await axios.post(
        "/expenses",
        data
    );

    return res.data.expenses;

};

export const fetchExpenses = async (groupId) => {

    const res = await axios.get(
        `/expenses/groups/${groupId}/expenses`
    );

    console.log("API RESPONSE:", res.data);


    return res?.data?.data ?? [];

};
