import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../groups/groupApi";
import { fetchDashboard } from "./dashboardApi";

import SummaryCards from "./SummaryCards";
import BalanceTable from "./BalanceTable";
import SettlementList from "./SettlementList";

export default function Dashboard() {

  
    const { data: groups, isLoading: groupsLoading } = useQuery({
        queryKey: ["groups"],
        queryFn: fetchGroups
    });

    const groupId = groups?.[0]?.id;

    const { data, isLoading } = useQuery({
        queryKey: ["dashboard", groupId],
        queryFn: () => fetchDashboard(groupId),
        enabled: !!groupId   // ⭐ prevents NULL call
    });

   
    if (groupsLoading || !groupId || isLoading) {
        return (
            <div className="text-lg font-medium">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <SummaryCards summary={data.summary} />

            <BalanceTable balances={data.balances} />

            <SettlementList settlements={data.settlements} />

        </div>
    );
}
