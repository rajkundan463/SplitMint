import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "./dashboardApi";
import { useGroup } from "../../context/GroupContext";

import SummaryCards from "./SummaryCards";
import BalanceTable from "./BalanceTable";
import AddExpenseButton from "../expenses/AddExpenseButton";
import ParticipantManager from "../participants/ParticipantManager";
import ExpenseList from "../expenses/ExpenseList";
import SettlementButton from "../settlement/settlementButton";

export default function Dashboard() {

    const { selectedGroup } = useGroup();
    const groupId = selectedGroup?.id;



    const { data, isLoading } = useQuery({
        queryKey: ["dashboard", groupId],
        queryFn: () => fetchDashboard(groupId),
        enabled: !!groupId
    });


    if (!groupId) {
        return (
            <div className="text-lg font-medium">
                Select a group to continue.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="text-lg font-medium">
                Loading financial dashboard...
            </div>
        );
    }

    return (

        <div className="space-y-8">


            <SummaryCards summary={data?.summary} />
            <div className="flex justify-end">
                <AddExpenseButton />
            </div>
            <ParticipantManager />
            <ExpenseList />
            <SettlementButton />
            <BalanceTable balances={data?.balances || []} />

        </div>
    );
}
